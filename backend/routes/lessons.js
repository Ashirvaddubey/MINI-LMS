const router = require("express").Router()
const jwt = require("jsonwebtoken")
const Lesson = require("../models/lesson")
const Course = require("../models/course")

function requireCreator(req, res, next) {
  const auth = req.headers.authorization || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null
  if (!token) return res.status(401).json({ error: "Unauthorized" })
  try {
    const { JWT_SECRET } = req.app.locals.config
    const user = jwt.verify(token, JWT_SECRET)
    if (user.role !== "creator" && user.role !== "admin") return res.status(403).json({ error: "Forbidden" })
    req.user = user
    next()
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" })
  }
}

// Create lesson (enforces unique order per course via index)
router.post("/", requireCreator, async (req, res) => {
  try {
    const { courseId, title, content, transcript, order } = req.body
    const course = await Course.findById(courseId)
    if (!course) return res.status(404).json({ error: "Course not found" })
    if (String(course.creatorId) !== req.user.sub && req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" })
    const lesson = await Lesson.create({ courseId, title, content, transcript, order })
    res.json({ lesson })
  } catch (e) {
    if (e && e.code === 11000) return res.status(400).json({ error: "Lesson order must be unique within course" })
    res.status(500).json({ error: "Failed to create lesson" })
  }
})

// List lessons for a course (published only)
router.get("/by-course/:courseId", async (req, res) => {
  const course = await Course.findById(req.params.courseId)
  if (!course) return res.status(404).json({ error: "Course not found" })
  if (!course.published) return res.status(403).json({ error: "Course not published" })
  const lessons = await Lesson.find({ courseId: course._id }).sort({ order: 1 })
  res.json({ lessons })
})

module.exports = router


