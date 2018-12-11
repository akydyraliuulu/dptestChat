const Message = require("mongoose").model("Message");

module.exports = (req, res) => {
  console.log(req.body);
  console.log("msg ketti");
  get(req, res);
};

function get(req, res) {
  Message.find({}, (err, messages) => {
    res.status(200).json({
      messages: messages,
      status: "success"
    });
  });
}
