var express = require("express");
var index = express.Router();
var changePassword = require("./changePassword");

index.post("/", changePassword);

module.exports = index;
