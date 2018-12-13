var express = require("express");
var routes = express.Router();
var users = require("./users");
var messages = require("./messages");

routes.use("/users", users);
routes.use("/messages", messages);
module.exports = routes;
