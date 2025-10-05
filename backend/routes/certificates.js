const router = require("express").Router()
const { requireAuth } = require("../middlewares/auth")
const Certificate = require("../models/certificate")

router.get("/mine", requireAuth, async (req, res) => {
  const certs = await Certificate.find({ userId: req.user.sub }).sort({ createdAt: -1 })
  res.json({ certificates: certs })
})

router.get("/verify/:serial", async (req, res) => {
  const cert = await Certificate.findOne({ serialHash: req.params.serial })
  if (!cert) return res.status(404).json({ valid: false })
  res.json({ valid: true, certificate: cert })
})

module.exports = router


