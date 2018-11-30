let express = require('express');
let index = express.Router();
let signUp = require('./register');
let login = require('./login');
let logout = require('./logout');

index.use('/register',signUp);
index.use('/login',login);
index.use('/logout',logout);

module.exports = index;