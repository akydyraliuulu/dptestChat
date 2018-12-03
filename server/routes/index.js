var express = require('express');
var routes = express.Router();
var users = require('./users');
var messages = require('./messages');

routes.get('/', (req,res)=>{
    console.log("Connected");
    res.status(200).json({message:'Connected!'})
});
routes.use('/users',users);
routes.use('/messages', messages);
module.exports = routes;