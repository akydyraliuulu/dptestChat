const Gift = require("mongoose").model("Gift");
const User = require("mongoose").model("User");
module.exports = (req, res) => {
  confirmPassword(req.body.inputPersonId, req.body.inputPersonPassword);

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
        getAll(req, res);
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

  function getAll(req, res) {
    Gift.getAllGifts(giftsCallback);
    var allGifts = [];
    function giftsCallback(err, _allGifts) {
      if (err) {
        res
          .status(200)
          .json({
            status: "error",
            error: "ギフトを取得できませんでした",
            hint: ""
          });
      }
      allGifts = _allGifts;
      res
        .status(200)
        .json({
          status: "success",
          error: "",
          hint: "取得しました",
          gifts: allGifts
        });
    }
  }
};
