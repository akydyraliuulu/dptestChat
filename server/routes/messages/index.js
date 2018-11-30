var express = require('express');
var index = express.Router();
var messages = require('./messages')

index.post('/', messages);

module.exports = index;