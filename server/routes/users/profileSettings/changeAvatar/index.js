var express = require("express");
var index = express.Router();
var changeAvatar = require("./changeAvatar");

index.post("/", changeAvatar);

module.exports = index;
