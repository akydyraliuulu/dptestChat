var createError = require("http-errors");
let express = require("express");
var path = require("path");
var morgan = require("morgan");
global.socketIO = require("./sockets/socketIO");
let app = express();
let port = process.env.PORT || 5000;
let bodyParser = require("body-parser");

require("./model/db");

var routes = require("./routes");

app.use(express.static(path.join(__dirname, "public/assets")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => console.log(`Listening on port ${port}`));

var server = require("http").createServer(app);

app.use("/api", routes);

app.use(function(req, res, next) {
  next(createError(404));
});

socketIO.init(server);
socketIO.connectUsersSocket();
