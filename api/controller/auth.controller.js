var wrong =0;
var Users = require('../../models/users.model.js')
module.exports.login = function(req,res) {
  res.render("./auth/login.pug");
}
module.exports.postLogin = async function(req,res){
  var mail = req.body.mail;
  var password = req.body.password
  const bcrypt = require('bcrypt')
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(req.body.password, salt)
  var user = await Users.find({mail: mail});
  if(user.length===0){
    res.render("./auth/login.pug",{
      errors:['user is not exist']
    });
    return;
  }
  
  if(!bcrypt.compareSync(password, user[0].password)){
    res.render("./auth/login.pug",{
      errors:['wrong password']
    });
    wrong++;
    if(wrong===3){
      wrong=0;
    }
    return;
  }

  res.json(user)
  res.cookie('usercookie', user[0]._id,{signed:true});

  res.redirect('/users');
}