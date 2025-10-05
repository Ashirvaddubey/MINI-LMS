const router = require("express").Router()
const { requireAuth, requireRole } = require("../middlewares/auth")
const ctrl = require("../controllers/adminController")

router.get("/review/courses", requireAuth, requireRole("admin"), (req, res, next) => ctrl.reviewList(req, res, next))
router.post("/review/courses/:id/approve", requireAuth, requireRole("admin"), (req, res, next) => ctrl.approveCourse(req, res, next))
router.post("/review/courses/:id/reject", requireAuth, requireRole("admin"), (req, res, next) => ctrl.rejectCourse(req, res, next))

router.get("/review/creators", requireAuth, requireRole("admin"), (req, res, next) => ctrl.reviewCreators(req, res, next))
router.post("/review/creators/:id/approve", requireAuth, requireRole("admin"), (req, res, next) => ctrl.approveCreator(req, res, next))
router.post("/review/creators/:id/reject", requireAuth, requireRole("admin"), (req, res, next) => ctrl.rejectCreator(req, res, next))

module.exports = router


