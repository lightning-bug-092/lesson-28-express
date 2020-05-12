var db = require("../db.js");
var md5 = require('md5');
const bcrypt = require('bcrypt')
var shortId = require('shortid');
var Users = require('../models/users.model.js')
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = async function(req, res,next) {
  try{
  var users = await Users.find();
  res.render("./users/users.pug", {
    users: users
  });
  } catch(error){
    next(error);
     
  }
  
}

module.exports.create = function(req, res) {
  res.render("./users/create.pug");
};
module.exports.update = function(req, res) {
  res.render("./users/update.pug");
};
module.exports.delete =async function(req, res) {
  var id = req.params.id;
  var user =await Users.find({_id:id})
  res.render("./users/delete.pug", {
    user: user[0]
  });
}
module.exports.profile =async function(req,res){
  var user = await Users.find({_id:req.params.id})
  res.render("./users/profile.pug",{
    user: user[0]
  })
}
module.exports.postCreate = function(req, res) {
  req.body.id = shortId.generate();
  req.body.avatarUrl = "https://res.cloudinary.com/minhhieu092/image/upload/v1588216119/ujlew3dksexo3vg99koj.png";
  req.body.isAdmin = false;
  var salt = bcrypt.genSaltSync(10)
  req.body.password= bcrypt.hashSync(req.body.password, salt)
  Users.create(req.body);
  res.redirect("/users");
};
module.exports.postUpdate =async function(req, res) {
  var id = req.params.id;
  
   const data = {
      image: req.file.path
    }
   var user = await Users.findOne({_id:id})
    cloudinary.uploader.upload(data.image, function(error, result) {
    user.avatarUrl= result.url;
    user.save();
    res.redirect("/users");
  });

  
};
module.exports.postDelete =async function(req, res) {
  var id = req.params.id;
  await Users.deleteOne({ _id: id });

   res.redirect("/users");
};
