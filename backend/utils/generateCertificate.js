const crypto = require("crypto")

function generateSerial(userId, courseId) {
  return crypto.createHash("sha256").update(`${userId}:${courseId}:${Date.now()}`).digest("hex")
}

module.exports = { generateSerial }


