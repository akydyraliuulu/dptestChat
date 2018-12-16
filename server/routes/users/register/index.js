let express = require("express");
const User = require("mongoose").model("User");
let router = express.Router();
// let register = require("./register");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,"./uploads");
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.name);
  }
});
const upload = multer({storage: storage});

router.post("/", (req, res, next) =>{
console.log()
validateForm(req, res);
})

function save(req, res) {
    let userData = {
      username: req.body.username,
      password: req.body.password,
     // avatarUrl: req.file.path 
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

module.exports = router;
