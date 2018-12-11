let mongoose = require("mongoose");
let autoIncrement = require("mongoose-auto-increment");

let userSchema = new mongoose.Schema({
  userId: Number,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdOn: { type: Date, default: Date.now }
});

userSchema.statics.login = function(userData, callback) {
  this.find(
    { username: userData.username, password: userData.password },
    "userId username password createdOn",
    { sort: "modifiedOn" },
    callback
  );
};

userSchema.statics.logout = function(userData, callback) {
  this.find(
    { username: userData.username, password: userData.password },
    "userId username",
    { sort: "modifiedOn" },
    callback
  );
};

userSchema.statics.validateUserName = function(username, callback) {
  this.find(
    { username: username },
    "userId username password createdOn",
    { sort: "modifiedOn" },
    callback
  );
};

userSchema.statics.validatePassword = function(password, callback) {
  this.find(
    { password: password },
    "password",
    { sort: "modifiedOn" },
    callback
  );
};

userSchema.plugin(autoIncrement.plugin, { model: "User", field: "userId" });
module.exports = mongoose.model("User", userSchema);
