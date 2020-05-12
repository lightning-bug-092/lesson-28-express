var mongoose = require('mongoose');
 
var transactionSchema = new mongoose.Schema({
  bookId: String,
  userId: String,
  isComplete: Boolean
});
var transaction = mongoose.model('transaction',transactionSchema,'transactions');
module.exports = transaction;