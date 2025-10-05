const mongoose = require("mongoose")

async function connectDb(mongoUrl) {
  await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 10000 })
}

module.exports = { connectDb }


