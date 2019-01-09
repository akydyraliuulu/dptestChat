var express = require("express");
var index = express.Router();
var changeName = require("./changeName");
var changeAvatar = require("./changeAvatar");
var changePassword = require("./changePassword");
var validatePassword = require("./validatePassword");

index.use("/changeName", changeName);
index.use("/changeAvatar", changeAvatar);
index.use("/changePassword", changePassword);
index.use("/validatePassword", validatePassword);
module.exports = index;
