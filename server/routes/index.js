var express = require("express");
var routes = express.Router();
var users = require("./users");
var messages = require("./messages");

console.log('api/')
routes.use("/users", users);
routes.use("/messages", messages);
module.exports = routes;
