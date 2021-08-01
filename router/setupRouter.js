var express = require("express");
var route = express.Router();
var book = require("../models/bookModel");

route.get("/LMS/setupBooks", function (req, res) {
  // seed database
  var starterBooks = [
    {
      user: "admin",
      bookName: "The Lord of the Rings",
      author: "J. R. R. Tolkien",
    },
    {
      user: "admin",
      bookName: "The Hobbit, or There and Back Again",
      author: "J. R. R. Tolkien",
    },
    {
      user: "admin",
      bookName: "A Game of Thrones",
      author: "George R. R. Martin",
    },
  ];
  book.create(starterBooks, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

module.exports = route;
