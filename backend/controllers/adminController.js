const Course = require("../models/course")
const CreatorApplication = require("../models/creatorApplication")
const User = require("../models/user")

function paginateQuery(q, req) {
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit || "10", 10)))
  const offset = Math.max(0, parseInt(req.query.offset || "0", 10))
  return { q: q.limit(limit).skip(offset), limit, offset }
}

exports.reviewList = async (req, res, next) => {
  try {
    const { q, limit, offset } = paginateQuery(Course.find({ published: false }).sort({ createdAt: -1 }), req)
    const items = await q
    const next_offset = items.length === limit ? offset + limit : null
    res.json({ items, next_offset })
  } catch (e) { next(e) }
}

exports.approveCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, { published: true }, { new: true })
    if (!course) return res.status(404).json({ error: { code: "NOT_FOUND" } })
    res.json({ course })
  } catch (e) { next(e) }
}

exports.rejectCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ error: { code: "NOT_FOUND" } })
    await course.deleteOne()
    res.json({ ok: true })
  } catch (e) { next(e) }
}

// Creator applications
exports.reviewCreators = async (req, res, next) => {
  try {
    const { q, limit, offset } = paginateQuery(
      CreatorApplication.find({ status: "pending" }).sort({ createdAt: -1 }),
      req
    )
    const items = await q
    const next_offset = items.length === limit ? offset + limit : null
    res.json({ items, next_offset })
  } catch (e) { next(e) }
}

exports.approveCreator = async (req, res, next) => {
  try {
    const appDoc = await CreatorApplication.findById(req.params.id)
    if (!appDoc) return res.status(404).json({ error: { code: "NOT_FOUND" } })
    appDoc.status = "approved"
    await appDoc.save()
    await User.findByIdAndUpdate(appDoc.userId, { role: "creator" })
    res.json({ application: appDoc })
  } catch (e) { next(e) }
}

exports.rejectCreator = async (req, res, next) => {
  try {
    const appDoc = await CreatorApplication.findById(req.params.id)
    if (!appDoc) return res.status(404).json({ error: { code: "NOT_FOUND" } })
    appDoc.status = "rejected"
    appDoc.adminNote = req.body?.adminNote
    await appDoc.save()
    res.json({ application: appDoc })
  } catch (e) { next(e) }
}


