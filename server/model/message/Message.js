var mongoose = require("mongoose");
let autoIncrement = require("mongoose-auto-increment");

var MessageSchema = new mongoose.Schema({
  msgId: Number,
  senderId: Number,
  receiverId: Number,
  text: String,
  imageUrl: String,
  sticker: String,
  createdOn: { type: Date, default: Date.now }
});
MessageSchema.plugin(autoIncrement.plugin, {
  model: "Message",
  field: "msgId"
});
module.exports = mongoose.model("Message", MessageSchema);
