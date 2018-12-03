const User = require('mongoose').model("User");

module.exports = (req, res) => {
  console.log(res.body);
  let userData = {
    username: req.body.user.username,
    password: req.body.user.password
  };

  User.logout(userData, (err, user) => {
    if (err) {
      res.status(200).json({
        status: "error",
        error: "Failed to logout",
        hint: ""
      });
    } else if (user.length === 0) {
      res.status(200).json({
        status: "error",
        error: "not allowed",
        hint: ""
      });
    }   else {
      res.status(200).json({
        status: "success",
        error: "",
        user: user[0],
        hint: "Logged out"
      });
    }
  });
};
