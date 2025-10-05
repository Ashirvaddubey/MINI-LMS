const { verifyToken } = require("../config/jwt")

function authOptional(req, _res, next) {
  const auth = req.headers.authorization || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null
  if (token) {
    try {
      const user = verifyToken(req.app.locals.config.JWT_ACCESS_SECRET, token)
      req.user = user
    } catch {}
  }
  next()
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null
  if (!token) return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Missing token" } })
  try {
    const user = verifyToken(req.app.locals.config.JWT_ACCESS_SECRET, token)
    req.user = user
    next()
  } catch {
    return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Invalid token" } })
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: { code: "UNAUTHORIZED" } })
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: { code: "FORBIDDEN" } })
    next()
  }
}

module.exports = { authOptional, requireAuth, requireRole }


