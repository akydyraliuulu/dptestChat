var express = require("express");
var index = express.Router();
var validatePassword = require("./validatePassword");

index.post("/", validatePassword);

module.exports = index;
