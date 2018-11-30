let express = require('express');
let index = express.Router();
let register = require('./register');

console.log("not found post")
index.post('/', register);

module.exports = index;