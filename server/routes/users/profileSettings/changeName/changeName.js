const User = require("mongoose").model("User");
module.exports = (req, res) => {
  console.log("req.body ", req.body);
  confirmPassword(req.body._id, req.body.inputPersonPassword);

  function confirmPassword(inputPersonId, inputPersonPassword) {
    var userData = {
      _id: inputPersonId,
      password: inputPersonPassword
    };
    User.confirmWithPassword(userData, (err, users) => {
      console.log("userData:", userData);
      if (err) {
        res.status(200).json({
          status: "error",
          error: "あなたのアイデンティティを確認できませんでした",
          hint: ""
        });
      } else if (users && users.length > 0) {
        changeName(req, res);
      } else {
        console.log("user:", users);
        res.status(200).json({
          status: "error",
          error:
            "マネージャーが存在しない。或いはパスワードが違っています。 あなたのアイデンティティを確認できませんでした",
          hint: ""
        });
      }
    });
  }

  function changeName(req, res) {
    var conditions = { _id: req.body._id };
    var update = { username: req.body.newName };
    var options = { new: true };
    User.findOneAndUpdate(conditions, update, options, callback);

    function callback(err, updatedUserDoc) {
      if (err) {
        res.status(200).json({
          status: "error",
          error: "項目を変更できませんでした",
          hint: ""
        });
      }
      res.status(200).json({
        status: "success",
        error: "",
        hint: "項目を変更しました",
        user: updatedUserDoc
      });
    }
  }
};
