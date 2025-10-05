function errorHandler(err, _req, res, _next) {
  if (err && err.field && err.code) {
    return res.status(err.status || 400).json({ error: { code: err.code, field: err.field, message: err.message } })
  }
  const message = err && err.message ? err.message : "Internal Server Error"
  res.status(err.status || 500).json({ error: { code: "INTERNAL_ERROR", message } })
}

module.exports = { errorHandler }


