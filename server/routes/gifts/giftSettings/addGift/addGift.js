const Gift = require("mongoose").model("Gift");
const User = require("mongoose").model("User");
var Jimp = require("jimp");
var uuid = require("uuid");

module.exports = (req, res) => {
  confirmPassword(req.body.inputPersonId, req.body.inputPersonPassword);

  function confirmPassword(inputPersonId, inputPersonPassword) {
    var userData = {
      _id: inputPersonId,
      password: inputPersonPassword
    };
    User.confirmWithPassword(userData, (err, users) => {
      if (err) {
        res.status(200).json({
          status: "error",
          error: "あなたのアイデンティティを確認できませんでした",
          hint: ""
        });
      } else if (users && users.length > 0) {
        changeGift(req, res);
      } else {
        res.status(200).json({
          status: "error",
          error:
            "パフォーマが存在しない。或いはパスワードが違っています。 あなたのアイデンティティを確認できませんでした",
          hint: ""
        });
      }
    });

    function changeGift(req, res) {
      //var imgUuid = uuid();

      Gift.nextCount(function(err, count) {
        if (err) {
          res.status(200).json({
            status: "error",
            error: "次のIDを取得できませんでした",
            hint: ""
          });
        }
        req.nextCount = count;
        saveImage();
      });
      function saveImage() {
        if (req.body.imgUrl) {
          var buffer = new Buffer(req.body.imgUrl.split(",")[1], "base64");

          Jimp.read(buffer, function(err, giftImg) {
            if (err) throw err;
            giftImg // resize
              .quality(60) // set JPEG quality
              .write(
                `public/assets/gifts/${req.nextCount}/giftImg.` +
                  giftImg.getExtension(),
                fileSaveCallback
              ); // save
          });
        } else {
          saveToDatabase();
        }
      }

      function fileSaveCallback(err, data) {
        if (err) {
          res.status(200).json({
            status: "error",
            error: "プレゼント画像を保存できませんでした",
            hint: ""
          });
        }
        saveToDatabase(data);
      }

      function saveToDatabase() {
        // var conditions = { giftId: req.body.giftId}
        // var update = { $push: { graviaPics: graviaEntity } }
       var updateBody = {};
        if (req.body.title) {
          updateBody.title = req.body.title;
        }
        if (req.body.imgUrl) {
          updateBody.imgUrl = `assets/gifts/${
            req.nextCount
          }/giftImg.png?${uuid()}`;
        }
        
        var newGift = new Gift(updateBody);
        newGift.save(saveToDatabaseCallback);

        function saveToDatabaseCallback(err, updatedGiftDoc) {
          if (err) {
            res.status(200).json({
              status: "error",
              error: "項目を変更できませんでした",
              hint: ""
            });
          } else {
            Gift.populate(
              updatedGiftDoc,
              [{ path: "category" }, { path: "tags" }],
              function(err, giftDoc) {
                if (err) {
                  res.status(200).json({
                    status: "error",
                    error: "failed to populate fields",
                    hint: ""
                  });
                } else {
                  res.status(200).json({
                    status: "success",
                    error: "",
                    hint: "項目を変更しました",
                    gift: giftDoc
                  });
                }
              }
            );
          }
        }
      }
    }
  }
};
