const User = require("mongoose").model("User");

module.exports = (req, res) => {
  let userData = {
    username: req.body.user.username,
    password: req.body.user.password
  };
  console.log(req.body);

  User.login(userData, (err, user) => {
    if (err) {
      res.status(200).json({
        status: "error",
        error: "Failed to login"
      });
    } else if (user.length === 0) {
      res.status(200).json({
        status: "error",
        error: "not allowed"
      });
    } else {
      res.status(200).json({
        status: "success",
        user: user[0],
        hint: "Logged in"
      });
    }
  });
};
