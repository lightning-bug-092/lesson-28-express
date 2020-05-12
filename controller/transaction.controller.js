var db = require("../db.js");
var shortId = require("shortid");
var Transactions = require('../models/transactions.model.js')
var Users = require('../models/users.model.js')
var Books = require('../models/books.model.js')
module.exports.index = async function(req, res) {
  var userId = req.signedCookies.usercookie;
  var transactions = await Transactions.find({userId:userId});
  var books=[];
 
  for(var transaction of transactions){
  var book= await Books.find({_id: transaction.bookId})
  books.push(book[0].title)
  }
   // var page = parseInt(req.query.page) || 1;
   //  if(page*4>db.get('transactions').value().length)
   //      page = parseInt(db.get('transactions').value().length/4)+1;
   //  var perPage = 4;
   //  var begin = (page-1)*perPage;
   //  var end = page*perPage;
  res.render("./transactions/index.pug", {
    transactions: transactions,
     books :  books,
    // pageNumber: page
  });
}
module.exports.create = async function(req, res) {
  var books = await Books.find();
  var users = await Users.find();
  res.render("./transactions/create.pug", {
    books: books,
    users: users
  });
};
module.exports.postCreate = function(req, res) {
  req.body.isComplete =false;
  Transactions.create(req.body)
  res.redirect("/transactions");
};
module.exports.complete = function(req,res){
  res.render('./transactions/complete.pug')
}
module.exports.postComplete =async function(req,res){
  var id = req.params.id;
  var err=[];
  var transactions = await Transactions.find({_id: id })
  if(transactions.length===0)
    err.push('id does not exist');
  if(err.length){
    res.render('./transactions/complete.pug',{
      err:err
    })
    return;
  }
   var transaction=await Transactions.findOne({_id: id })
   transaction.isComplete = req.body.isComplete;
  transaction.save();
  res.redirect("/transactions");
}
