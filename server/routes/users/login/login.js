const User = require("mongoose").model("User");

module.exports = (req, res) => {
  console.log("response");
  let userData = {
    username: req.body.user.username,
    password: req.body.user.password
  };
  User.find({}, (err, users) => {});

  User.login(userData, (err, user) => {
    if (err) {
      res.status(200).json({
        status: "error",
        error: "Failed to login",
        hint: ""
      });
    } else if (user.length === 0) {
      res.status(200).json({
        status: "error",
        error: "not allowed",
        hint: ""
      });
    } else {
      res.status(200).json({
        status: "success",
        error: "",
        user: user[0],
        hint: "Logged in"
      });
    }
  });
};
