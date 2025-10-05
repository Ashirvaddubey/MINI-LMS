const router = require("express").Router()
const { requireAuth } = require("../middlewares/auth")
const ctrl = require("../controllers/authController")

router.post("/register", ctrl.register)
router.post("/login", ctrl.login)
router.post("/refresh", ctrl.refresh)
router.get("/me", requireAuth, (req, res, next) => ctrl.me(req, res, next))

module.exports = router


