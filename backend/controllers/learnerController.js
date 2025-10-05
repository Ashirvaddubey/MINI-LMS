const Course = require("../models/course")
const Lesson = require("../models/lesson")
const Progress = require("../models/progress")
const Certificate = require("../models/certificate")
const crypto = require("crypto")

function paginateQuery(q, req) {
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit || "10", 10)))
  const offset = Math.max(0, parseInt(req.query.offset || "0", 10))
  return { q: q.limit(limit).skip(offset), limit, offset }
}

exports.listCourses = async (req, res, next) => {
  try {
    const filter = { published: true }
    const { q, limit, offset } = paginateQuery(Course.find(filter).sort({ createdAt: -1 }), req)
    const items = await q
    const next_offset = items.length === limit ? offset + limit : null
    res.json({ items, next_offset })
  } catch (e) { next(e) }
}

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course || !course.published) return res.status(404).json({ error: { code: "NOT_FOUND" } })
    const lessons = await Lesson.find({ courseId: course._id }).sort({ order: 1 })
    res.json({ course, lessons })
  } catch (e) { next(e) }
}

exports.enroll = async (req, res, next) => {
  try {
    const { id } = req.params
    const course = await Course.findById(id)
    if (!course || !course.published) return res.status(404).json({ error: { code: "NOT_FOUND" } })
    const prog = await Progress.findOneAndUpdate(
      { userId: req.user.sub, courseId: id },
      { $setOnInsert: { completedLessons: [], progressPercent: 0 } },
      { new: true, upsert: true }
    )
    res.json({ progress: prog })
  } catch (e) { next(e) }
}

exports.myProgress = async (req, res, next) => {
  try {
    const { q, limit, offset } = paginateQuery(Progress.find({ userId: req.user.sub }).sort({ updatedAt: -1 }), req)
    const items = await q
    const next_offset = items.length === limit ? offset + limit : null
    res.json({ items, next_offset })
  } catch (e) { next(e) }
}

exports.completeLesson = async (req, res, next) => {
  try {
    const { lessonId } = req.params
    const lesson = await Lesson.findById(lessonId)
    if (!lesson) return res.status(404).json({ error: { code: "NOT_FOUND" } })
    const course = await Course.findById(lesson.courseId)
    if (!course || !course.published) return res.status(403).json({ error: { code: "FORBIDDEN" } })
    const total = await Lesson.countDocuments({ courseId: lesson.courseId })
    let prog = await Progress.findOneAndUpdate(
      { userId: req.user.sub, courseId: lesson.courseId },
      { $addToSet: { completedLessons: lesson._id } },
      { new: true, upsert: true }
    )
    const completed = prog.completedLessons.length
    prog.progressPercent = Math.min(100, Math.round((completed / total) * 100))
    await prog.save()
    res.json({ progress: prog })
  } catch (e) { next(e) }
}

exports.getCertificate = async (req, res, next) => {
  try {
    const { courseId } = req.params
    const prog = await Progress.findOne({ userId: req.user.sub, courseId })
    if (!prog || prog.progressPercent < 100) return res.status(400).json({ error: { code: "NOT_ELIGIBLE" } })
    let cert = await Certificate.findOne({ userId: req.user.sub, courseId })
    if (!cert) {
      const serialHash = crypto.createHash("sha256").update(`${req.user.sub}:${courseId}:${Date.now()}`).digest("hex")
      cert = await Certificate.create({ userId: req.user.sub, courseId, serialHash })
    }
    res.json({ certificate: cert })
  } catch (e) { next(e) }
}

exports.getLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId)
    if (!lesson) return res.status(404).json({ error: { code: "NOT_FOUND" } })
    const course = await Course.findById(lesson.courseId)
    if (!course || !course.published) return res.status(403).json({ error: { code: "FORBIDDEN" } })
    res.json({ lesson, course })
  } catch (e) { next(e) }
}


