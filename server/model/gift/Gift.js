var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

var giftSchema = new mongoose.Schema({
  giftId: Number,
  title: { type: String, default: "" },
  imgUrl: String,
});

giftSchema.statics.addGift = function(title, callback) {
  var gift = new this({ title: title });
  gift.save(callback);
};

giftSchema.statics.getAllGifts = function(callback) {
  var conditions = {};
  this.find(conditions).exec(callback);
};

//Build the Gift model
giftSchema.plugin(autoIncrement.plugin, { model: "Gift", field: "giftId" });
mongoose.model("Gift", giftSchema);
