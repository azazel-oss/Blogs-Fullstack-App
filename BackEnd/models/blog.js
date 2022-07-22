const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  publishStatus: {
    type: String,
    enum: ["Published", "Unpublished"],
    default: "Published",
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
