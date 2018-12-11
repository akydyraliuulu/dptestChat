const Message = require("mongoose").model("Message");

module.exports = (req, res) => {
  console.log("msg keldi");
  console.log(req.body);
  save(req, res);
};

function save(req, res) {
  let mData = {
    senderName: req.body.senderName,
    receiverName: req.body.receiverName,
    text: req.body.text
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
