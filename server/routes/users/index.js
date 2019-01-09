let express = require("express");
let index = express.Router();
let signUp = require("./register");
let login = require("./login");
let logout = require("./logout");
let profileSettings = require("./profileSettings");

index.use("/register", signUp);
index.use("/login", login);
index.use("/logout", logout);
index.use("/profileSettings", profileSettings);

module.exports = index;
