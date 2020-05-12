var mongoose = require('mongoose');
 
var sessionSchema = new mongoose.Schema({
  cart: {}
});
var session = mongoose.model('session',sessionSchema,'sessions');
module.exports = session;