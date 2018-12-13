let mongoose = require("mongoose");
let autoIncrement = require("mongoose-auto-increment");

var dbuser = "oleksiileontiev",
  dbpassword = "MtPVtPGqJaXB42";
var dbURI =
  "mongodb://" +
  dbuser +
  ":" +
  dbpassword +
  "@ds151452.mlab.com:51452/dreampirates";
mongoose.connect(dbURI,{ useNewUrlParser: true });
autoIncrement.initialize(mongoose.connection);
mongoose.connection.on("connected", function() {
  console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("error", function(err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected");
});
process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});

require("./message/Message");
require("./user/User");

var projectSchema = new mongoose.Schema({
  projectName: String,
  createdOn: Date,
  modifiedOn: { type: Date, default: Date.now },
  createdBy: String,
  tasks: String
});

projectSchema.statics.findByUserID = function(userid, callback) {
  this.find(
    { createdBy: userid },
    "_id projectName",
    { sort: "modifiedOn" },
    callback
  );
};

//Build the Project model
mongoose.model("Project", projectSchema);

module.exports = autoIncrement;
