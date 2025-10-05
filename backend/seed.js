const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("./models/user")
const Course = require("./models/course")
const Lesson = require("./models/lesson")

async function run() {
  const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/Skillonbackend"
  await mongoose.connect(MONGO_URL)

  await Promise.all([User.deleteMany({}), Course.deleteMany({}), Lesson.deleteMany({})])

  const [admin, creator, learner] = await Promise.all([
    User.create({ name: "Admin", email: "admin@example.com", passwordHash: await bcrypt.hash("password", 10), role: "admin" }),
    User.create({ name: "Creator", email: "creator@example.com", passwordHash: await bcrypt.hash("password", 10), role: "creator" }),
    User.create({ name: "Learner", email: "learner@example.com", passwordHash: await bcrypt.hash("password", 10), role: "learner" }),
  ])

  const course = await Course.create({ title: "Intro to MicroCourses", description: "Sample course", creatorId: creator._id, published: true })
  await Lesson.create({ courseId: course._id, title: "Welcome", content: "Lesson content", transcript: "", order: 1 })
  await Lesson.create({ courseId: course._id, title: "Getting Started", content: "Lesson content", transcript: "", order: 2 })

  // eslint-disable-next-line no-console
  console.log("Seeded users:", { admin: admin.email, creator: creator.email, learner: learner.email })
  await mongoose.disconnect()
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
})


