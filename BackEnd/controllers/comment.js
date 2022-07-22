const Comment = require("../models/comment");

async function getAllComments(req, res, next) {
  const comments = await Comment.find();
  res.json({
    comments,
  });
}

async function postComment(req, res, next) {
  const comment = new Comment({
    text: req.body.text,
    blog: req.params.blogId,
    author: req.user._id,
    timestamp: Date.now(),
  });
  try {
    await comment.save();
  } catch (error) {
    res.json({
      text: "Something went wrong",
      error,
    });
  }
  res.json({
    text: "Comment created",
    comment,
  });
}

async function getCommentById(req, res, next) {
  const comment = await Comment.findById(req.params.commentId);
  res.json({
    comment,
  });
}

async function updateComment(req, res, next) {
  const updatedComment = new Comment({
    text: req.body.text,
    blog: req.params.blogId,
    author: req.user._id,
    timestamp: Date.now(),
  });

  try {
    await Comment.findByIdAndUpdate(req.params.commentId, updatedComment);
  } catch (error) {
    res.json({
      text: "Something went wrong",
      error,
    });
  }
  res.json({
    text: "Successfully updated",
    comment: updatedComment,
  });
}

async function deleteComment(req, res, next) {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
  } catch (error) {
    res.json({
      text: "Something went wrong",
      error,
    });
  }
  res.json({
    text: "Successfully deleted",
  });
}

module.exports = {
  getAllComments,
  postComment,
  getCommentById,
  updateComment,
  deleteComment,
};
