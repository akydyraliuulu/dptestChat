var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    username: String,
    msg: String,
    createdOn: { type: Date, 'default': Date.now },
});
module.exports = mongoose.model('Message', MessageSchema);