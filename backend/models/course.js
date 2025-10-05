const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Course", CourseSchema)


