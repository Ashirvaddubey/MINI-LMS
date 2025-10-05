const router = require("express").Router()
const { requireAuth } = require("../middlewares/auth")
const ctrl = require("../controllers/learnerController")

router.get("/courses", (req, res, next) => ctrl.listCourses(req, res, next))
router.get("/courses/:id", (req, res, next) => ctrl.getCourse(req, res, next))
router.get("/lessons/:lessonId", (req, res, next) => ctrl.getLesson(req, res, next))
router.post("/courses/:id/enroll", requireAuth, (req, res, next) => ctrl.enroll(req, res, next))
router.get("/progress", requireAuth, (req, res, next) => ctrl.myProgress(req, res, next))
router.post("/lessons/:lessonId/complete", requireAuth, (req, res, next) => ctrl.completeLesson(req, res, next))
router.get("/certificates/:courseId", requireAuth, (req, res, next) => ctrl.getCertificate(req, res, next))

module.exports = router


