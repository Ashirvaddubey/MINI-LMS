const mongoose = require("mongoose")

const CreatorApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    bio: { type: String, required: true },
    portfolioUrl: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
    adminNote: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model("CreatorApplication", CreatorApplicationSchema)


