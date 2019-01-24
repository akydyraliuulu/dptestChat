var express = require("express");
var index = express.Router();
var getAll = require("./getAll");
var giftSettings = require("./giftSettings");

index.use("/getAll", getAll);
index.use("/giftSettings", giftSettings);

module.exports = index;
