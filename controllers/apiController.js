var books = require("../models/bookModel");
var bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.get("/LMS/", function (req, res) {
    res.send("Welcome to Library");
  });

  //To get books
  app.get("/LMS/getBooks", function (req, res) {
    //return book with Id.no
    if (req.query.id) {
      books.findById({ _id: req.query.id }, function (err, book) {
        if (err) res.send(`Invalid book id : ${req.query.id} \n ${err}`);
        res.send(book);
      });
    }
    //return
    else if (req.query.bookName) {
      books.find({ bookName: req.query.bookName }, function (err, book) {
        if (err)
          res.send(`Invalid book name : ${req.query.bookName} \n ${err}`);
        res.send(book);
      });
    } else if (req.query.author) {
      books.find({ author: req.query.author }, function (err, book) {
        if (err)
          res.send(`Invalid book author : ${req.query.author} \n ${err}`);
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

  app.post("/LMS/books", function (req, res) {
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
      // {
      //   "bookName": "Harry Potter and the Philosopher's Stone",
      //   "author": "J. K. Rowling"
      // }
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

  app.delete("/LMS/books", function (req, res) {
    books.findByIdAndRemove(req.body.id, function (err) {
      if (err) throw err;
      res.send("Successfully deleted");
    });
  });
};
