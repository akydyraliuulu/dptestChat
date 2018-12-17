let express = require("express");
const path = require("path");
const User = require("mongoose").model("User");
let router = express.Router();
let Jimp = require("jimp");
let uuid = require('uuid');

function saveAvatar(req, res) {
  let buffer = new Buffer(req.body.user.avatarImg.split(",")[1], "base64");
  Jimp.read(buffer, function(err, avatarImg) {
    if (err) {
      throw err;
    }
    avatarImg
      .resize(250, 250) // resize
      .quality(60) // set JPEG quality
      .write(`public/uploads/`); // save
      save(req, res);
  });
}

router.post("/", (req, res) => {
  console.log(req);
  validateForm(req, res);
});

function save(req, res) {
  let userData = {
    username: req.body.user.username,
    password: req.body.user.password,
    avatarUrl: `uploads/${uuid()}`
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
