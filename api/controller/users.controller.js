const bcrypt = require('bcrypt')
var Users = require('../../models/users.model.js')
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = async function(req, res) {
  var users = await Users.find();
  res.json(users)
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
  res.json(user)
}
module.exports.profile =async function(req,res){
  var user = await Users.find({_id:req.params.id})
  res.json(user)
}
module.exports.postCreate = function(req, res) {
  req.body.avatarUrl = "https://res.cloudinary.com/minhhieu092/image/upload/v1588216119/ujlew3dksexo3vg99koj.png";
  req.body.isAdmin = false;
  var salt = bcrypt.genSaltSync(10)
  req.body.password= bcrypt.hashSync(req.body.password, salt)
  var user = Users.create(req.body); 
};
module.exports.postUpdate =async function(req, res) {
  var id = req.params.id;
  
   const data = {
      image: req.file.path
    }
   var user = await Users.findOne({_id:id})
    cloudinary.uploader.upload(data.image, function(error, result) {
    user.avatarUrl= result.url 
    res.json(user)
  });

  
};
module.exports.postDelete =async function(req, res) {
  var id = req.params.id;
  var user =  await Users.deleteOne({ _id: id });
  res.json(user)
};