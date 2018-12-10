let express = require("express");
let index = express.Router();
let register = require("./register");

index.post("/", register);

module.exports = index;
