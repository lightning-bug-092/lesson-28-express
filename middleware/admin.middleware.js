var db = require('../db')
var Users = require('../models/users.model.js')
module.exports.admin =async function(req,res,next){
  var user =await Users.find({_id: req.signedCookies.usercookie});
  if(user[0].isAdmin===true){
    res.redirect('/users');
    return;
  }
  next();
}