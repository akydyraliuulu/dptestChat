const Message = require("mongoose").model("Message");

module.exports = (req, res) => {
  save(req, res);
};

function save(req, res) {
  let mData = {
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    text: req.body.text,
    image: req.body.image,
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
