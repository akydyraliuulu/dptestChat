var express = require("express");
var index = express.Router();
var changeName = require("./changeName");

index.post("/", changeName);

module.exports = index;
