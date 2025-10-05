const router = require("express").Router()
const jwt = require("jsonwebtoken")
const Enrollment = require("../models/enrollment")
const Course = require("../models/course")
const Lesson = require("../models/lesson")
const Certificate = require("../models/certificate")
const crypto = require("crypto")

function requireLearner(req, res, next) {
  const auth = req.headers.authorization || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null
  if (!token) return res.status(401).json({ error: "Unauthorized" })
  try {
    const { JWT_SECRET } = req.app.locals.config
    const user = jwt.verify(token, JWT_SECRET)
    if (user.role !== "learner" && user.role !== "creator" && user.role !== "admin")
      return res.status(403).json({ error: "Forbidden" })
    req.user = user
    next()
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" })
  }
}

// Enroll in a published course
router.post("/enroll", requireLearner, async (req, res) => {
  const { courseId } = req.body
  const course = await Course.findById(courseId)
  if (!course) return res.status(404).json({ error: "Course not found" })
  if (!course.published) return res.status(403).json({ error: "Course not published" })
  const enrollment = await Enrollment.findOneAndUpdate(
    { userId: req.user.sub, courseId },
    { $setOnInsert: { progressPercent: 0, completedLessons: [] } },
    { new: true, upsert: true }
  )
  res.json({ enrollment })
})

// Update progress by marking lesson complete
router.post("/complete-lesson", requireLearner, async (req, res) => {
  const { courseId, lessonId } = req.body
  const course = await Course.findById(courseId)
  if (!course || !course.published) return res.status(403).json({ error: "Invalid course" })
  const totalLessons = await Lesson.countDocuments({ courseId })
  if (totalLessons === 0) return res.status(400).json({ error: "No lessons" })
  const enrollment = await Enrollment.findOneAndUpdate(
    { userId: req.user.sub, courseId },
    { $addToSet: { completedLessons: lessonId } },
    { new: true, upsert: true }
  )
  const completed = enrollment.completedLessons.length
  const progress = Math.min(100, Math.round((completed / totalLessons) * 100))
  enrollment.progressPercent = progress
  await enrollment.save()
  res.json({ enrollment })
})

// Issue certificate when progress is 100%
router.post("/issue-certificate", requireLearner, async (req, res) => {
  const { courseId } = req.body
  const enrollment = await Enrollment.findOne({ userId: req.user.sub, courseId })
  if (!enrollment || enrollment.progressPercent < 100) return res.status(400).json({ error: "Not eligible" })
  const serialHash = crypto.createHash("sha256").update(`${req.user.sub}:${courseId}:${Date.now()}`).digest("hex")
  const cert = await Certificate.findOneAndUpdate(
    { userId: req.user.sub, courseId },
    { $setOnInsert: { serialHash } },
    { new: true, upsert: true }
  )
  res.json({ certificate: cert })
})

module.exports = router


