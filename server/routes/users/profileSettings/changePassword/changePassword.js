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
            error: "あなたのアイデンティティを確認できませんでした",
            hint: ""
          });
      } else if (users && users.length > 0) {
        changePasswordAsUsers(req, res);
      } else {
        res
          .status(200)
          .json({
            status: "error",
            error:
              "マネージャーが存在しない。或いはパスワードが違っています。 あなたのアイデンティティを確認できませんでした",
            hint: ""
          });
      }
    });
  }

  function changePasswordAsUsers(req, res) {
    var conditions = { _id: req.body.inputPersonId };
    var update = { password: req.body.newPassword };
    var options = { new: true, safe: true };
    User.findOneAndUpdate(conditions, update, options, callback);

    function callback(err, updatedUserDoc) {
      if (err) {
        res
          .status(200)
          .json({
            status: "error",
            error: "項目を変更できませんでした",
            hint: ""
          });
      }
      res
        .status(200)
        .json({
          status: "success",
          error: "",
          hint: "項目を変更しました",
          user: updatedUserDoc
        });
    }
  }
};
