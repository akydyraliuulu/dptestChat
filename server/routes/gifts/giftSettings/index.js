var express = require("express");
var index = express.Router();
var addGift = require("./addGift");
index.use("/addGift", addGift);
module.exports = index;
