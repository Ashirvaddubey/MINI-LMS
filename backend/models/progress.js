const mongoose = require("mongoose")

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    progressPercent: { type: Number, default: 0 },
  },
  { timestamps: true }
)

ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true })

module.exports = mongoose.model("Progress", ProgressSchema)


