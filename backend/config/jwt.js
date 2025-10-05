const jwt = require("jsonwebtoken")

function signAccessToken(secret, payload) {
  return jwt.sign(payload, secret, { expiresIn: "15m" })
}

function signRefreshToken(secret, payload) {
  return jwt.sign(payload, secret, { expiresIn: "7d" })
}

function verifyToken(secret, token) {
  return jwt.verify(token, secret)
}

module.exports = { signAccessToken, signRefreshToken, verifyToken }


