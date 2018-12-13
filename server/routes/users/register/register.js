const User = require("mongoose").model("User");
const validator = require("validator");

module.exports = (req, res) => {
  validateForm(req, res);
};

function save(req, res) {
  let userData = {
    username: req.body.user.username,
    password: req.body.user.password
  };

  let newUser = new User(userData);
  newUser.save(err => {
    if (err) {
      res.status(200).json({
        status: "error",
        error: "server error",
        hint: "required"
      });
      return false;
    }
    res.status(200).json({
      status: "success",
      error: "error",
      hint: "hint",
      user: userData
    });
  });
}

function validateForm(req, res) {
  let resObj = {
    bool: true,
    status: "",
    error: "",
    hint: ""
  };

  User.validateUserName(req.body.user.username, (err, user) => {
    if (err) {
      res.status(200).json({
        status: "error",
        error: "server error",
        hint: "hi"
      });
    } else {
      if (user.length === 0) {
        resObj.bool = true;
        resObj.status = "success";
        resObj.error = "";
      } else {
        if (user[0].verified === false) {
          if (user[0].sendSignal === true) {
            resObj.bool = false;
            resObj.status = "verifiedFalseSendTrue";
            resObj.error = "hihi";
          } else {
            resObj.bool = false;
            resObj.status = "verifiedFalseSendFalse";
            resObj.error = "hehe";
          }
        } else {
          resObj.bool = false;
          resObj.status = "verifiedTrue";
          resObj.error = "username exist";
        }
      }

      if (resObj.bool === true) {
        save(req, res);
      } else {
        res.status(200).json({
          status: resObj.status,
          error: resObj.error,
          hint: "so"
        });
      }
    }
  });
}
