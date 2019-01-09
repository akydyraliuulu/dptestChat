let express = require("express");
const User = require("mongoose").model("User");
let router = express.Router();
let uuid = require("uuid");
let Jimp = require("jimp");

const generatedId = uuid();

function saveAvatar(req, res) {
  let buffer = new Buffer(req.body.user.avatarImg.split(",")[1], "base64");
  Jimp.read(buffer, function(err, avatarImg) {
    if (err) {
      throw err;
    }
    avatarImg
      .resize(250, 250)
      .quality(60)
      .write(`public/assets/${generatedId}/avatar.jpg`);
    save(req, res);
  });
}

router.post("/", (req, res) => {
  validateForm(req, res);
});

function save(req, res) {
  let userData = {
    username: req.body.user.username,
    password: req.body.user.password,
    avatarUrl: `assets/${generatedId}/avatar.jpg`
  };

  let newUser = new User(userData);
  newUser.save((err, user) => {
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
      user: user
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
        saveAvatar(req, res);
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

module.exports = router;
