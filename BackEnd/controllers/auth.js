const User = require("../models/user");

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = (req, res) => {
  // Make sure this account doesn't already exist
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user)
        return res.status(401).json({
          message:
            "The username you have entered is already associated with another account.",
        });

      // Create and save the user
      const newUser = new User(req.body);
      newUser
        .save()
        .then((user) =>
          res.status(200).json({ token: user.generateJWT(), user: user })
        )
        .catch((err) => res.status(500).json({ message: err.message }));
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          msg:
            "The username" +
            req.body.username +
            " is not associated with any account. Double-check your username and try again.",
        });

      //validate password
      if (!user.comparePassword(req.body.password))
        return res
          .status(401)
          .json({ message: "Invalid username or password" });

      // Login successful, write token, and send back user
      res.status(200).json({ token: user.generateJWT(), user: user });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};
