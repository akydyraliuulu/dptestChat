let express = require("express");
let index = express.Router();
let messages = require("./messages");
let message = require("./message");

index.post("/", messages);
index.get("/", message);

module.exports = index;
