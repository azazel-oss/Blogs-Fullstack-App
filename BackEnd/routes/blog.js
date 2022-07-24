const express = require("express");
const authenticate = require("../middlewares/authenticate");

const {
  getAllBlogs,
  postBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");

const router = express.Router();

// GET /api/blogs => get all blogs
router.get("/", getAllBlogs);

// POST /api/blogs => create new blog
router.post("/", authenticate, postBlog);

// GET /api/blogs/:blogId => get a single blog
router.get("/:blogId", getBlogById);

// PUT /api/blogs/:blogId => update a single blog
router.put("/:blogId", authenticate, updateBlog);

// DELETE /api/blogs/:blogId => delete a single blog
router.delete("/:blogId", authenticate, deleteBlog);

module.exports = router;
