var shortId = require('shortid');
var db = require('../db')
var Session = require('../models/sessions.model.js')
module.exports =async function(req,res,next){
    if(!req.signedCookies.sessionId){
      await Session.create({cart:{}});
      var session = await Session.find();
        res.cookie('sessionId', session[0]._id, {signed:true});
    }
    next();
}