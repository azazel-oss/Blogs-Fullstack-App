const Blog = require("../models/blog");

async function getAllBlogs(req, res, next) {
  const blogs = await Blog.find();
  res.status(200).json({
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
    res.status(500).json({
      text: "Something went wrong",
      error,
    });
  }
  res.status(200).json({
    text: "Blog created",
    blog,
  });
}

async function getBlogById(req, res, next) {
  const blog = await Blog.findById(req.params.blogId);
  res.status(200).json({
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

  const oldBlog = await Blog.findById(req.params.blogId);

  if (req.user._id.toString() !== oldBlog.author.toString())
    return res.status(401).json({
      message: "Sorry, you don't have the permission to update this data.",
    });

  try {
    await Blog.findByIdAndUpdate(req.params.blogId, updatedBlog);
  } catch (error) {
    res.status(500).json({
      text: "Something went wrong",
      error,
    });
  }
  res.status(200).json({
    text: "Successfully updated",
    blog: updatedBlog,
  });
}

async function deleteBlog(req, res, next) {
  const oldBlog = await Blog.findById(req.params.blogId);

  if (req.user._id.toString() !== oldBlog.author.toString())
    return res.status(401).json({
      message: "Sorry, you don't have the permission to delete this data.",
    });

  try {
    await Blog.findByIdAndDelete(req.params.blogId);
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
  getAllBlogs,
  postBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
