var express = require("express");
var index = express.Router();
var login = require("./login");

index.post("/", login);

module.exports = index;
