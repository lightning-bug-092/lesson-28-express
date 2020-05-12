var db = require('../db.js')
var Users = require('../models/users.model.js')
module.exports.login = function(req,res,next){
  if(!req.signedCookies.usercookie){
    res.redirect('/auth/login');
    return;
  }
  var user = Users.find({_id: req.signedCookies.usercookie});
  if(!user){
    res.redirect('/auth/login');
    return;
  }
  res.locals.user = user;
  next();
}