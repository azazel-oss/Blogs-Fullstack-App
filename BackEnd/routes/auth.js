const express = require("express");
const { check } = require("express-validator");
const Auth = require("../controllers/auth");
const validate = require("../middlewares/validate");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message:
      "You are in the Auth Endpoint. Register or Login to test Authentication.",
  });
});

router.post(
  "/register",
  [
    check("username").not().isEmpty().withMessage("You username is required"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 4 })
      .withMessage("Must be at least 4 chars long"),
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("You first name is required"),
    check("lastName").not().isEmpty().withMessage("You last name is required"),
  ],
  validate,
  Auth.register
);

router.post(
  "/login",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  validate,
  Auth.login
);

module.exports = router;
