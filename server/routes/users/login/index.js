var express = require("express");
var index = express.Router();
var login = require("./login");

console.log("login");
index.post("/", login);

module.exports = index;
