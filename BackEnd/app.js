require("dotenv").config();
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Database configuration
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.once("open", () => console.log("Connection established with the database"));
db.on("error", console.error.bind(console, "mongo connection error"));

const blogRouter = require("./routes/blog");
const commentRouter = require("./routes/comment");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/blogs", blogRouter);
app.use("/api/blogs/:blogId/comments", commentRouter);

module.exports = app;
