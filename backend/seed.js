const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("./models/user")
const Course = require("./models/course")
const Lesson = require("./models/lesson")
const Enrollment = require("./models/enrollment")
const Progress = require("./models/progress")
const Certificate = require("./models/certificate")
const CreatorApplication = require("./models/creatorApplication")

async function run() {
  const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/Skillonbackend"
  await mongoose.connect(MONGO_URL)

  // Clear collections
  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    Lesson.deleteMany({}),
    Enrollment.deleteMany({}),
    Progress.deleteMany({}),
    Certificate.deleteMany({}),
    CreatorApplication.deleteMany({}),
  ])

  // Users
  const password = await bcrypt.hash("password", 10)
  const [admin, creator, learner] = await Promise.all([
    User.create({ name: "Admin", email: "admin@example.com", passwordHash: password, role: "admin" }),
    User.create({ name: "Creator", email: "creator@example.com", passwordHash: password, role: "creator" }),
    User.create({ name: "Learner", email: "learner@example.com", passwordHash: password, role: "learner" }),
  ])

  // Courses
  const jsCourse = await Course.create({
    title: "JavaScript Fundamentals",
    description: "Learn the basics of modern JavaScript",
    creatorId: creator._id,
    published: true,
  })
  const reactCourse = await Course.create({
    title: "React for Beginners",
    description: "Build interactive UIs with React",
    creatorId: creator._id,
    published: true,
  })

  // Lessons
  const jsL1 = await Lesson.create({ courseId: jsCourse._id, title: "Intro to JS", content: "Variables, types, and operators", transcript: "", order: 1 })
  const jsL2 = await Lesson.create({ courseId: jsCourse._id, title: "Functions", content: "Declarations, expressions, and arrow functions", transcript: "", order: 2 })
  const reactL1 = await Lesson.create({ courseId: reactCourse._id, title: "Intro to React", content: "Components and JSX", transcript: "", order: 1 })

  // Enrollment and Progress for learner
  await Enrollment.create({ userId: learner._id, courseId: jsCourse._id, progressPercent: 50, completedLessons: [jsL1._id] })
  await Progress.create({ userId: learner._id, courseId: jsCourse._id, progressPercent: 50, completedLessons: [jsL1._id] })

  // Certificate for JS course (pretend completed)
  await Certificate.create({ userId: learner._id, courseId: reactCourse._id, serialHash: `CERT-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}` })

  // Creator application (pending) for learner
  await CreatorApplication.create({ userId: learner._id, bio: "Aspiring instructor with web dev experience", portfolioUrl: "https://example.com", status: "pending" })

  // eslint-disable-next-line no-console
  console.log("Seeded:", {
    users: [admin.email, creator.email, learner.email],
    courses: [jsCourse.title, reactCourse.title],
    lessons: [jsL1.title, jsL2.title, reactL1.title],
  })
  await mongoose.disconnect()
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
})


