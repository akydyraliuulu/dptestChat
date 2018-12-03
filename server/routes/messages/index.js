let express = require('express');
let index = express.Router();
let messages = require('./messages')

index.post('/', messages);

module.exports = index;