const Blog = require("../models/blog");

async function getAllBlogs(req, res, next) {
  const blogs = await Blog.find();
  res.json({
    blogs,
  });
}

async function postBlog(req, res, next) {
  const blog = new Blog({
    title: req.body.title,
    text: req.body.text,
    timestamp: req.body.timestamp,
    author: req.user._id,
    publishStatus: req.body.publishStatus,
  });

  try {
    await blog.save();
  } catch (error) {
    res.json({
      text: "Something went wrong",
      error,
    });
  }
  res.json({
    text: "Blog created",
    blog,
  });
}

async function getBlogById(req, res, next) {
  const blog = await Blog.findById(req.params.blogId);
  res.json({
    blog,
  });
}

async function updateBlog(req, res, next) {
  const updatedBlog = new Blog({
    title: req.body.title,
    text: req.body.text,
    timestamp: req.body.timestamp,
    author: req.user._id,
    publishStatus: req.body.publishStatus,
  });

  try {
    await Blog.findByIdAndUpdate(req.params.blogId, updatedBlog);
  } catch (error) {
    res.json({
      text: "Something went wrong",
      error,
    });
  }
  res.json({
    text: "Successfully updated",
    blog: updatedBlog,
  });
}

async function deleteBlog(req, res, next) {
  try {
    await Blog.findByIdAndDelete(req.params.blogId);
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
  getAllBlogs,
  postBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
