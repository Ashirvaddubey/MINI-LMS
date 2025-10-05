const mongoose = require("mongoose")

const EnrollmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    progressPercent: { type: Number, default: 0 },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  },
  { timestamps: true }
)

EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true })

module.exports = mongoose.model("Enrollment", EnrollmentSchema)


