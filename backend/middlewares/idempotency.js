const IdempotencyKey = require("../models/idempotencyKey")

async function idempotencyMiddleware(req, res, next) {
  if (req.method !== "POST") return next()
  const key = req.headers["idempotency-key"]
  if (!key) return next()
  const existing = await IdempotencyKey.findOne({ key })
  if (existing) {
    return res.status(existing.status).json(existing.response)
  }
  // Capture res.json to store response
  const originalJson = res.json.bind(res)
  res.json = async (body) => {
    try {
      await IdempotencyKey.create({ key, status: res.statusCode, response: body })
    } catch {}
    return originalJson(body)
  }
  next()
}

module.exports = { idempotencyMiddleware }


