const Comment = require("../models/comment");

async function getAllComments(req, res, next) {
  const comments = await Comment.find();
  res.status(200).json({
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
  console.log(req.params);
  try {
    await comment.save();
  } catch (error) {
    return res.status(500).json({
      text: "Something went wrong",
      error,
    });
  }
  res.status(200).json({
    text: "Comment created",
    comment,
  });
}

async function getCommentById(req, res, next) {
  const comment = await Comment.findById(req.params.commentId);
  res.status(200).json({
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
    res.status(500).json({
      text: "Something went wrong",
      error,
    });
  }
  res.status(200).json({
    text: "Successfully updated",
    comment: updatedComment,
  });
}

async function deleteComment(req, res, next) {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
  } catch (error) {
    res.status(500).json({
      text: "Something went wrong",
      error,
    });
  }
  res.status(200).json({
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
