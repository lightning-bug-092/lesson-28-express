var mongoose = require('mongoose');
 
var bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverUrl: String
});
var book = mongoose.model('book',bookSchema,'books');
module.exports = book;