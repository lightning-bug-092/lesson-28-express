var Transactions = require('../../models/transactions.model.js')
module.exports.getTran = async function(req,res){
  var transactions = await Transactions.find();
  res.json(transactions);
}