var express = require("express");
var app = express();
var mongoose = require("mongoose");
var setupRouter = require("./router/setupRouter");
var apiRouter = require("./router/apiRouter");

var port = 80 || process.env.PORT;
var uname = process.env.uname,
  pwd = process.env.pwd,
  dbName = process.env.dbname;
var dbstring = `mongodb+srv://${uname}:${pwd}@keshav-lms.biuic.mongodb.net/${dbName}?retryWrites=true&w=majority`;

console.log(`Application starting, listening at PORT ${port}`);
mongoose
  .connect(dbstring, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log("success, connected to DB !!");
  })
  .catch(function (err) {
    console.log("no connection " + err);
  });

app.use("/seedData/", setupRouter);
app.use("/LMS/", apiRouter);

app.listen(port);
