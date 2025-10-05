const bcrypt = require("bcryptjs")
const User = require("../models/user")
const { signAccessToken, signRefreshToken, verifyToken } = require("../config/jwt")

function fieldError(field, message) {
  const err = new Error(message)
  err.status = 400
  err.code = "FIELD_REQUIRED"
  err.field = field
  return err
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name) throw fieldError("name", "Name is required")
    if (!email) throw fieldError("email", "Email is required")
    if (!password) throw fieldError("password", "Password is required")
    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ error: { code: "EMAIL_EXISTS", field: "email", message: "Email already registered" } })
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash, role: "learner" })
    const access = signAccessToken(req.app.locals.config.JWT_ACCESS_SECRET, { sub: user._id.toString(), role: user.role, name: user.name })
    const refresh = signRefreshToken(req.app.locals.config.JWT_REFRESH_SECRET, { sub: user._id.toString() })
    res.json({ access_token: access, refresh_token: refresh, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (e) { next(e) }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email) throw fieldError("email", "Email is required")
    if (!password) throw fieldError("password", "Password is required")
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials" } })
    const ok = await user.verifyPassword(password)
    if (!ok) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials" } })
    const access = signAccessToken(req.app.locals.config.JWT_ACCESS_SECRET, { sub: user._id.toString(), role: user.role, name: user.name })
    const refresh = signRefreshToken(req.app.locals.config.JWT_REFRESH_SECRET, { sub: user._id.toString() })
    res.json({ access_token: access, refresh_token: refresh, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (e) { next(e) }
}

exports.refresh = async (req, res, next) => {
  try {
    const { refresh_token } = req.body
    if (!refresh_token) throw fieldError("refresh_token", "Refresh token is required")
    const payload = verifyToken(req.app.locals.config.JWT_REFRESH_SECRET, refresh_token)
    const user = await User.findById(payload.sub)
    if (!user) return res.status(401).json({ error: { code: "INVALID_TOKEN" } })
    const access = signAccessToken(req.app.locals.config.JWT_ACCESS_SECRET, { sub: user._id.toString(), role: user.role, name: user.name })
    res.json({ access_token: access })
  } catch (e) { next(e) }
}

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.sub)
    if (!user) return res.status(404).json({ error: { code: "NOT_FOUND" } })
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role })
  } catch (e) { next(e) }
}


