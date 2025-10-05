const CreatorApplication = require("../models/creatorApplication")
const Course = require("../models/course")
const Lesson = require("../models/lesson")
const User = require("../models/user")

function paginateQuery(q, req) {
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit || "10", 10)))
  const offset = Math.max(0, parseInt(req.query.offset || "0", 10))
  return { q: q.limit(limit).skip(offset), limit, offset }
}

exports.apply = async (req, res, next) => {
  try {
    const { bio, portfolioUrl } = req.body
    if (!bio) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "bio", message: "Bio is required" } })
    const existing = await CreatorApplication.findOne({ userId: req.user.sub, status: { $in: ["pending", "approved"] } })
    if (existing) return res.status(400).json({ error: { code: "ALREADY_EXISTS", message: "Application already exists" } })
    const app = await CreatorApplication.create({ userId: req.user.sub, bio, portfolioUrl })
    res.json({ application: app })
  } catch (e) { next(e) }
}

exports.dashboard = async (req, res, next) => {
  try {
    const { q, limit, offset } = paginateQuery(Course.find({ creatorId: req.user.sub }).sort({ createdAt: -1 }), req)
    const items = await q
    const next_offset = items.length === limit ? offset + limit : null
    res.json({ items, next_offset })
  } catch (e) { next(e) }
}

exports.createCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body
    if (!title) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "title", message: "Title is required" } })
    if (!description) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "description", message: "Description is required" } })
    const course = await Course.create({ title, description, creatorId: req.user.sub, published: false, status: "pending" })
    res.json({ course })
  } catch (e) { next(e) }
}

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ error: { code: "NOT_FOUND" } })
    if (String(course.creatorId) !== req.user.sub && req.user.role !== "admin") return res.status(403).json({ error: { code: "FORBIDDEN" } })
    const { title, description } = req.body
    if (title !== undefined) course.title = title
    if (description !== undefined) course.description = description
    await course.save()
    res.json({ course })
  } catch (e) { next(e) }
}

exports.addLesson = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, content, transcript, order, videoUrl } = req.body
    if (!title) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "title", message: "Title is required" } })
    if (order === undefined) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "order", message: "Order is required" } })
    const course = await Course.findById(id)
    if (!course) return res.status(404).json({ error: { code: "NOT_FOUND" } })
    if (String(course.creatorId) !== req.user.sub && req.user.role !== "admin") return res.status(403).json({ error: { code: "FORBIDDEN" } })
    const lesson = await Lesson.create({ courseId: id, title, content: content || "", transcript: transcript || "", order, videoUrl })
    res.json({ lesson })
  } catch (e) {
    if (e && e.code === 11000) return res.status(400).json({ error: { code: "UNIQUE_VIOLATION", field: "order", message: "Lesson order must be unique" } })
    next(e)
  }
}


