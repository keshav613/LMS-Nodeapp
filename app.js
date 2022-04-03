require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.port || 3000;
const loginRouter = require("./router/users");
var setupRouter = require("./router/setupRouter");
var apiRouter = require("./router/apiRouter");
const jwtAuthenticate = require("./auths/jwtStategy");

const passport = require("passport");
const mongoose = require("mongoose");
//const dbstring = `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.0gcba.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;
var dbstring = "mongodb://127.0.0.1:27017";
var session = require("express-session");
var cookieParser = require("cookie-parser");
app.use(session({ secret: "cats" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(dbstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("success, connected to DB !!");
  })
  .catch(function (err) {
    console.log("no connection " + err);
  });

app.use(passport.initialize());
app.use(passport.session());
require("./auths/googleAuth")(passport);

app.use("/", loginRouter);
//Add new route here for services. To use these services you need to login first
app.use(
  "/seedData/",
  (req, res, next) => jwtAuthenticate(req, res, next),
  setupRouter
);
app.use(
  "/LMS/",
  (req, res, next) => jwtAuthenticate(req, res, next),
  apiRouter
);

app.listen(port);
