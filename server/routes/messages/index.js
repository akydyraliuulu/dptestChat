let express = require("express");
let index = express.Router();
const Message = require("mongoose").model("Message");
let Jimp = require("jimp");
let uuid = require('uuid');

index.post("/", (req, res) => {
  save(req, res);
});

index.get("/", (req, res) => {
  getAllMessage(req, res);
});

index.post("/deleteMessage", (req, res) => {
  deleteMessage(req, res);
});

index.post("/image", (req, res) => {
    saveImage(req, res);
  });

module.exports = index;

function save(req, res) {
  let mData = {
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    text: req.body.text,
    image: `uploads/images/${uuid()}`,
    sticker: req.body.sticker
  };

  let newMessage = new Message(mData);
  newMessage.save(err => {
    if (err) {
      res.status(200).json({
        status: "error",
        error: "server error",
        hint: ""
      });
      return false;
    }
    res.status(200).json({
      status: "success",
      mData,
      error: "",
      hint: ""
    });
  });
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
  Message.findByIdAndDelete({_id: req.body._id}, (err) => {
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
        .write(`public/uploads/images`); // save
        save(req, res);
    });
    
  }
