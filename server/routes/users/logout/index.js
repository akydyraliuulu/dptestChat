var express = require("express");
var index = express.Router();
var logout = require("./logout");

index.post("/", logout);

module.exports = index;
