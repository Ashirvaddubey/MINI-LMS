const router = require("express").Router()
const jwt = require("jsonwebtoken")
const Course = require("../models/course")

function optionalAuth(req, _res, next) {
  const auth = req.headers.authorization || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null
  if (token) {
    try {
      const { JWT_SECRET } = req.app.locals.config
      req.user = jwt.verify(token, JWT_SECRET)
    } catch {}
  }
  next()
}

function requireCreator(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" })
  if (req.user.role !== "creator" && req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" })
  next()
}

// List courses
router.get("/", optionalAuth, async (req, res) => {
  const filter = req.user && (req.user.role === "creator" || req.user.role === "admin") ? {} : { published: true }
  const courses = await Course.find(filter).sort({ createdAt: -1 })
  res.json({ courses })
})

// Create course
router.post("/", optionalAuth, requireCreator, async (req, res) => {
  try {
    const { title, description } = req.body
    const course = await Course.create({ title, description, creatorId: req.user.sub, published: false })
    res.json({ course })
  } catch (e) {
    res.status(500).json({ error: "Failed to create course" })
  }
})

// Read course
router.get("/:id", optionalAuth, async (req, res) => {
  const course = await Course.findById(req.params.id)
  if (!course) return res.status(404).json({ error: "Not found" })
  if (!course.published && (!req.user || (req.user.role === "learner"))) {
    return res.status(403).json({ error: "Forbidden" })
  }
  res.json({ course })
})

// Update course
router.put("/:id", optionalAuth, requireCreator, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ error: "Not found" })
    if (String(course.creatorId) !== req.user.sub && req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" })
    const { title, description } = req.body
    if (title !== undefined) course.title = title
    if (description !== undefined) course.description = description
    await course.save()
    res.json({ course })
  } catch (e) {
    res.status(500).json({ error: "Failed to update" })
  }
})

// Delete course
router.delete("/:id", optionalAuth, requireCreator, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ error: "Not found" })
    if (String(course.creatorId) !== req.user.sub && req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" })
    await course.deleteOne()
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: "Failed to delete" })
  }
})

module.exports = router


