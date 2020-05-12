var mongoose = require('mongoose');
 
var userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  mail: String,
  password:String,
  isAdmin: Boolean,
  avatarUrl:String
});
var user = mongoose.model('user',userSchema,'users');
module.exports = user;