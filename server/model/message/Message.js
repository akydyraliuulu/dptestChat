var mongoose = require("mongoose");
let autoIncrement = require("mongoose-auto-increment");

var messageSchema = new mongoose.Schema({
  msgId: Number,
  senderId: Number,
  receiverId: Number,
  text: String,
  imageUrl: String,
  sticker: String,
  createdOn: { type: Date, default: Date.now }
});

messageSchema.statics.confirmWithId = function(msgId, callback) {
  this.find({ msgId: msgId }, "msgId", { sort: "modifiedOn" }, callback);
};

messageSchema.plugin(autoIncrement.plugin, {
  model: "Message",
  field: "msgId"
});
module.exports = mongoose.model("Message", messageSchema);
