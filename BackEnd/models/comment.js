const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  blog: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Blog",
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
