const User = require("mongoose").model("User");
var Jimp = require("jimp");
var uuid = require("uuid");

const generatedId = uuid();

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
        changeAvatar(req, res);
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

  function changeAvatar(req, res) {
    var buffer = new Buffer(req.body.newAvatarImg.split(",")[1], "base64");
    Jimp.read(buffer, function(err, avatarImg) {
      if (err) throw err;
      avatarImg
        .resize(250, 250) // resize
        .quality(60) // set JPEG quality
        .write(`public/assets/${generatedId}/avatar.jpg`,
          fileSaveCallback
        ); // save
    });

    function fileSaveCallback(err, data) {
      if (err) {
        res
          .status(200)
          .json({
            status: "error",
            error: "プロファイル画像を保存できませんでした",
            hint: ""
          });
      }
      saveToDatabase(data);
    }

    function saveToDatabase() {
      var conditions = { _id: req.body._id };
      var update = {
        avatarUrl: `assets/${generatedId}/avatar.jpg`
      };
      var options = { new: true };
      User.findOneAndUpdate(
        conditions,
        update,
        options,
        saveToDatabaseCallback
      );

      function saveToDatabaseCallback(err, updatedUserDoc) {
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
  }
};
