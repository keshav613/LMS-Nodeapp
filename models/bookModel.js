var mongoose = require("mongoose");
//Define a schema i.e., all the attributes of book
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  user: String,
  bookName: String,
  author: String,
});
//Now create a model with this schema
var books = mongoose.model("Books", bookSchema);

module.exports = books;
