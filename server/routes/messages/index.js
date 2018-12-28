let express = require("express");
let index = express.Router();
const Message = require("mongoose").model("Message");
const User = require("mongoose").model("User");
let Jimp = require("jimp");
let socketIO = require("../../sockets/socketIO");

index.post("/", (req, res) => {
  save(req, res);
});

index.get("/:userId", (req, res) => {
  getAllMessage(req, res);
});

index.delete("/deleteMessage/:_id", (req, res) => {
  deleteMessage(req, res);
});

index.post("/image", (req, res) => {
  saveImage(req, res);
});

index.post("/edit", (req, res) => {
  console.log(req.body);
  Message.confirmWithId(req.body.msgId, (err, messages) => {
    if (err) {
      res.status(200).json({
        status: "error",
        error: "error"
      });
    } else if (messages && messages.length > 0) {
      editMessage(req, res);
    } else {
      res.status(200).json({
        status: "error",
        error: "error"
      });
    }
  });
});

module.exports = index;

function save(req, res) {
  let url = "";
  if (req.body.uniqId) {
    url = `assets/${req.body.uniqId}/${req.body.imgName}`;
  }

  console.log(req.body);
  let receiverId = -1;
  if (req.body.receiverId !== "all") receiverId = req.body.receiverId;

  let mData = {
    senderId: req.body.senderId,
    receiverId: receiverId,
    text: req.body.text,
    imageUrl: url,
    sticker: req.body.sticker
  };

  let newMessage = new Message(mData);
  newMessage.save((err, messages) => {
    if (err) {
      res.status(200).json({
        status: "error",
        error: "server error"
      });
      return false;
    }
    res.status(200).json({
      status: "success",
      messages,
      error: ""
    });
    socketIO.sendToAll("getMessage", messages);
  });
}

function editMessage(req, res) {
  let conditions = { msgId: req.body.msgId };
  let url = "";
  if (req.body.uniqId) {
    url = `assets/${req.body.uniqId}/${req.body.imgName}`;
  }
  let mData = {
    text: req.body.text,
    imageUrl: url,
    sticker: req.body.sticker
  };
  let options = { new: true };

  Message.findOneAndUpdate(conditions, mData, options, saveToDatabaseCallback);

  function saveToDatabaseCallback(err, updatedMessageDoc) {
    if (err) {
      res.status(200).json({
        status: "error",
        error: "error"
      });
    }
    res.status(200).json({
      status: "success",
      messages: updatedMessageDoc
    });
    socketIO.sendToAll("getMessage", updatedMessageDoc);
  }
}

function getAllMessage(req, res) {
  let condition = {};
  console.log("userId");
  console.log(req.params.userId);
  // if (req.params.userId) {
  //   condition.senderId = req.params.userId;
  // }
  Message.find(condition)
    .sort("createdOn")
    .exec((err, messages) => {
      if (err) {
        res.status(200).json({
          status: "error",
          error: "error"
        });
      } else {
        User.find(messages.receiverId)
          .sort("createdOn")
          .exec((err, users) => {
            if (err) {
              res.status(200).json({
                status: "error",
                error: "error"
              });
            } else {
              res.status(200).json({
                status: "success",
                hint: "OK",
                messages,
                users
              });
            }
          });
      }
    });
}

function deleteMessage(req, res) {
  console.log(req.params);
  Message.findByIdAndRemove({ _id: req.params._id }, err => {
    if (err) {
      throw err;
    }
    res.status(200).json({
      status: "success"
    });
  });
}

function saveImage(req, res) {
  let buffer = new Buffer(req.body.image.split(",")[1], "base64");
  Jimp.read(buffer, function(err, image) {
    if (err) {
      throw err;
    }
    image
      .resize(250, 250) // resize
      .quality(60) // set JPEG quality
      .write(
        `public/assets/${req.body.uniqId}/${req.body.imgName}`,
        fileSaveCallback
      ); // save

    function fileSaveCallback(err) {
      if (err) {
        throw err;
      }
      save(req, res);
    }
  });
}
