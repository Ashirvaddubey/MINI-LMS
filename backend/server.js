// Express backend server for Mini LMS
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const { connectDb } = require("./config/db")
const { limiter } = require("./config/rateLimit")
const { errorHandler } = require("./middlewares/errorHandler")
const { idempotencyMiddleware } = require("./middlewares/idempotency")

dotenv.config()

const app = express()

// Middleware
app.use(express.json({ limit: "1mb" }))
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }))
app.use(morgan("dev"))
app.use(limiter)
app.use(idempotencyMiddleware)

// Config
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/Skillonbackend"
const JWT_ACCESS_SECRET = process.env.JWT_SECRET || "6019b58708081d57ab7f29f8086b4ad5"
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_6019b58708081d57ab7f29f8086b4ad5"
const PORT = process.env.PORT || 4000

// Expose config to routes via app locals
app.locals.config = { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET }

// Routes
app.get("/api/health", (_req, res) => {
  res.json({ ok: true })
})

app.use("/api/auth", require("./routes/auth"))
app.use("/api/creator", require("./routes/creator"))
app.use("/api/learner", require("./routes/learner"))
app.use("/api/admin", require("./routes/admin"))
app.use("/api/certificates", require("./routes/certificates"))
app.get("/api/_meta", (_req, res) => res.json({ name: "Mini LMS", version: "1.0.0" }))

// Error handler
app.use(errorHandler)

// DB connect and start
connectDb(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Backend running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Mongo connection error", err)
    process.exit(1)
  })

module.exports = app
