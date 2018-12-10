const express = require('express');
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
global.socketIO = require('./sockets/socketIO')
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

require("./model/db");

var routes = require("./routes");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

var server = require('http').createServer(app);

app.use("/api", routes);

app.use(function(req, res, next) {
  next(createError(404));
});

socketIO.init(server)
socketIO.connectUsersSocket()


