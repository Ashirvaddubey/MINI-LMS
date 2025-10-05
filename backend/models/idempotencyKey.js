const mongoose = require("mongoose")

const IdempotencyKeySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    status: { type: Number, required: true },
    response: { type: Object, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("IdempotencyKey", IdempotencyKeySchema)


