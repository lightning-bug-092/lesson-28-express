var db = require('../db')
var shortId = require('shortid');
var Session = require('../models/sessions.model.js')
var Books = require('../models/books.model.js')
module.exports.addToCart =async function(req,res,next){
    var bookId = req.params.bookId;
    var sessionId = req.signedCookies.sessionId;
    if(!sessionId){
        res.redirect('/books');
        return;
    }
    var cart =await Session.find({id:sessionId})                    
    await Session.findOneAndUpdate({id: sessionId},{bookId:1})
    
    res.redirect('/books');
}
module.exports.cart =async function(req,res){
   var cart =await Session.find({id:req.signedCookies.sessionId})
    var books = [];
    for(var item in cart){
      var book= await Books.find({_id: item})
      books.push(book[0].title)
    }
        
    res.render('./cart/cart.pug',{
        books:books,
        cart :cart
    })
}
module.exports.post = function(req,res){
    if(!req.signedCookies.usercookie){
        res.redirect('/auth/login')
        return;
    }
    var cart =  db.get('sessions')
    .find({id:req.signedCookies.sessionId})
    .get('cart')
    .value();
    for(var item in cart){
        var transaction = {}
        transaction.id = shortId.generate();
        transaction.userId = req.signedCookies.usercookie;
        transaction.bookId = item;
        transaction.isComplete = false;
        db.get("transactions")
        .push(transaction)
        .write();
    }
 
  res.redirect("/transactions");
}