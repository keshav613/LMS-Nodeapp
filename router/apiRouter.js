var express = require("express");
var route = express.Router();
var books = require("../models/bookModel");
var bodyParser = require("body-parser");

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }));
//Home page
route.get("/", function (req, res) {
  res.write("Welcome to Keshav's Library Management System \n");
  res.write("Use CRUD operations with REST Api");
  res.end();
});

//To get books
route.get("/getBooks", function (req, res) {
  if (req.query.id) {
    books.findById({ _id: req.query.id }, function (err, book) {
      if (err) res.send(`Invalid book id : ${req.query.id} \n ${err}`);
      res.send(book);
    });
  } else if (req.query.bookName) {
    books.find({ bookName: req.query.bookName }, function (err, book) {
      if (err) res.send(`Invalid book name : ${req.query.bookName} \n ${err}`);
      res.send(book);
    });
  } else if (req.query.author) {
    books.find({ author: req.query.author }, function (err, book) {
      if (err) res.send(`Invalid book author : ${req.query.author} \n ${err}`);
      res.send(book);
    });
  } else if (req.query.user) {
    books.find({ user: req.query.user }, function (err, book) {
      if (err) res.send(`Invalid user : ${req.query.user} \n ${err}`);
      res.send(book);
    });
  } else {
    //No query parameters, so return list of all books
    books.find(function (err, books) {
      if (err) res.send(err);
      res.send(books);
    });
  }
});
//Idempotent operation, create new book if not present else update that book
route.post("/books", function (req, res) {
  if (req.body.id) {
    books.findByIdAndUpdate(
      req.body.id,
      {
        bookName: req.body.bookName,
        author: req.body.author,
      },
      function (err, todo) {
        if (err) throw err;
        res.send("Success, book edited!!");
      }
    );
  } else {
    var newBook = books({
      user: "admin",
      bookName: req.body.bookName,
      author: req.body.author,
    });
    newBook.save(function (err) {
      if (err) throw err;
      res.send("Success, book saved!!");
    });
  }
});
//Delete this book
route.delete("/books", function (req, res) {
  books.findByIdAndRemove(req.body.id, function (err) {
    if (err) throw err;
    res.send("Successfully deleted");
  });
});

module.exports = route;
