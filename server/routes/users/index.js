let express = require("express");
let index = express.Router();
let signUp = require("./register");
let login = require("./login");
let logout = require("./logout");

console.log("users/");

index.use("/register", signUp);
index.use("/login", login);
index.use("/logout", logout);

module.exports = index;
