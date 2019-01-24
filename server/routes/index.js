var express = require("express");
var routes = express.Router();
var users = require("./users");
var messages = require("./messages");
var gifts = require("./gifts");

routes.use("/users", users);
routes.use("/messages", messages);
routes.use("/gifts", gifts);
module.exports = routes;
