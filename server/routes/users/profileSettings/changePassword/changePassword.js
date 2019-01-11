const User = require("mongoose").model("User");
module.exports = (req, res) => {
  confirmPassword(req.body._id, req.body.inputPersonPassword);

  function confirmPassword(inputPersonId, inputPersonPassword) {
    var userData = {
      _id: inputPersonId,
      password: inputPersonPassword
    };
    User.confirmWithPassword(userData, (err, users) => {
      if (err) {
        res
          .status(200)
          .json({
            status: "error",
            error: "could not confirm your identity",
            hint: ""
          });
      } else if (users && users.length > 0) {
        changePasswordAsUsers(req, res);
      } else {
        res
          .status(200)
          .json({
            status: "error",
            error: "The user does not exist. Or the password is wrong. I could not confirm your identity",
            hint: ""
          });
      }
    });
  }

  function changePasswordAsUsers(req, res) {
    var conditions = { _id: req.body._id };
    var update = { password: req.body.newPassword };
    var options = { new: true, safe: true };
    User.findOneAndUpdate(conditions, update, options, callback);

    function callback(err, updatedUserDoc) {
      if (err) {
        res
          .status(200)
          .json({
            status: "error",
            error: "The item could not be changed",
            hint: ""
          });
      }
      res
        .status(200)
        .json({
          status: "success",
          error: "",
          hint: "Item changed",
          user: updatedUserDoc
        });
    }
  }
};
