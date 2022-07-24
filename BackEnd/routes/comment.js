const express = require("express");
const authenticate = require("../middlewares/authenticate");

const {
  getAllComments,
  postComment,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../controllers/comment");

const router = express.Router({ mergeParams: true });

// GET /api/blogs/:blogId/comments => get all comments on a blog
router.get("/", getAllComments);

// POST /api/blogs/:blogId/comments => create new comment
router.post("/", authenticate, postComment);

// GET /api/blogs/:blogId/comments/:commentId => get a single comment
router.get("/:commentId", getCommentById);

// PUT /api/blogs/:blogId/comments/:commentId => update a single comment
router.put("/:commentId", authenticate, updateComment);

// DELETE /api/blogs/:blogId/comments/:commentId => delete a single comment
router.delete("/:commentId", authenticate, deleteComment);

module.exports = router;
