const router = require("express").Router()
const { requireAuth, requireRole } = require("../middlewares/auth")
const ctrl = require("../controllers/creatorController")

router.post("/apply", requireAuth, (req, res, next) => ctrl.apply(req, res, next))
router.get("/dashboard", requireAuth, requireRole("creator", "admin"), (req, res, next) => ctrl.dashboard(req, res, next))
router.post("/courses", requireAuth, requireRole("creator", "admin"), (req, res, next) => ctrl.createCourse(req, res, next))
router.put("/courses/:id", requireAuth, requireRole("creator", "admin"), (req, res, next) => ctrl.updateCourse(req, res, next))
router.post("/courses/:id/lessons", requireAuth, requireRole("creator", "admin"), (req, res, next) => ctrl.addLesson(req, res, next))

module.exports = router


