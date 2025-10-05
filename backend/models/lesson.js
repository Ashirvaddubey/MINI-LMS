const mongoose = require("mongoose")

const LessonSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    transcript: { type: String },
    order: { type: Number, required: true },
    videoUrl: { type: String },
  },
  { timestamps: true }
)

LessonSchema.index({ courseId: 1, order: 1 }, { unique: true })

module.exports = mongoose.model("Lesson", LessonSchema)


