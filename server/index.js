const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

require("./model/db");

var routes = require("./routes");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use("/api", routes);

app.use(function(req, res, next) {
  next(createError(404));
});


