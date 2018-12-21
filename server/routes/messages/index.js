let express = require("express");
let index = express.Router();
const Message = require("mongoose").model("Message");
let Jimp = require("jimp");

index.post("/", (req, res) => {
  save(req, res);
});

index.get("/", (req, res) => {
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
  const url = "";
  if (req.body.imgName) {
    url = `assets/${req.body.imgName}`;
  }
  console.log(req.body);
  let mData = {
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
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
  });
}

function editMessage(req, res) {
  let conditions = { msgId: req.body.msgId };
  const url = "";
  if (req.body.imgName) {
    url = `assets/${req.body.imgName}`;
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
  }
}

function getAllMessage(req, res) {
  Message.find({}, (err, messages) => {
    res.status(200).json({
      messages: messages,
      status: "success"
    });
  });
}

function deleteMessage(req, res) {
  console.log(req.params);
  Message.findByIdAndRemove({ _id: req.params._id }, err => {
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
      .write(`public/assets/${req.body.imgName}`, fileSaveCallback); // save

    function fileSaveCallback(err, data) {
      if (err) {
      }
      save(req, res);
    }
  });
}
