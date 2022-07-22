const express = require("express");

const {
  getAllComments,
  postComment,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../controllers/comment");

const router = express.Router();

// GET /api/blogs/:blogId/comments => get all comments on a blog
router.get("/", getAllComments);

// POST /api/blogs/:blogId/comments => create new comment
router.post("/", postComment);

// GET /api/blogs/:blogId/comments/:commentId => get a single comment
router.get("/:commentId", getCommentById);

// PUT /api/blogs/:blogId/comments/:commentId => update a single comment
router.put("/:commentId", updateComment);

// DELETE /api/blogs/:blogId/comments/:commentId => delete a single comment
router.delete("/:commentId", deleteComment);

module.exports = router;
