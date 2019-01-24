var express = require("express");
var index = express.Router();
var getAll = require("./getAll");

index.use("/getAll", getAll);
module.exports = index;
