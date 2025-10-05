const mongoose = require("mongoose")

const CertificateSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    serialHash: { type: String, required: true, unique: true, index: true },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

CertificateSchema.index({ userId: 1, courseId: 1 }, { unique: true })

module.exports = mongoose.model("Certificate", CertificateSchema)


