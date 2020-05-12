
var Books = require('../models/books.model.js')
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
module.exports.index = async function(req, res) {
  // var books = db.get("books").value();
  // res.render("./books/books.pug", {
  //   books: books
  // });
  var books = await Books.find();
  res.render("./books/books.pug", {
    books: books
  })
}
module.exports.create = function(req, res) {
  res.render("./books/create.pug");
};
// module.exports.update = function(req, res) {
//   res.render("./books/update.pug");
// };
// module.exports.delete = function(req, res) {
//   var id = req.params.id;
//   var book = db
//     .get("books")
//     .find({ id: id })
//     .value();
//   res.render("./books/delete.pug", {
//     book: book
//   });
// }
module.exports.postCreate = function(req, res) {
  const data = {
    image: req.file.path
  }
  cloudinary.uploader.upload(data.image, function(error, result) {
  req.body.coverUrl = result.url;
  Books.create(req.body)
  res.redirect("/books");
});
  
};
// module.exports.postUpdate = function(req, res) {
//   var id = req.params.id;
//   db.get("books")
//     .find({ id: id })
//     .assign({ description: req.body.description })
//     .write();
//   res.redirect("/books");
// };
// module.exports.postDelete = function(req, res) {
//   var id = req.params.id;
//   db.get("books")
//     .remove({ id: id })
//     .write();
//   res.redirect("/books");
// };