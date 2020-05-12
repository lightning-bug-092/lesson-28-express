// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
require('dotenv').config();
var express = require("express");
var mongoose = require('mongoose');
var app = express();
var bodyParser = require("body-parser");
var userRoute = require('./route/user.route.js')
var bookRoute = require('./route/book.route.js')
var transactionRoute = require("./route/transaction.route");
var authRoute = require("./route/auth.route");
var cartRoute = require('./route/cart.route');


var authRouteApi = require('./api/routes/auth.route.js')
var transactionRouteApi= require('./api/routes/transaction.route.js')
var bookRouteApi= require('./api/routes/books.route.js')
var userRouteApi= require('./api/routes/users.route.js')


var authMiddleware = require('./middleware/auth.middleware');
var adminMiddleware = require('./middleware/admin.middleware');
var sessionMiddleware = require('./middleware/session.middleware');


var count = require('./validate/countcookie.validate.js')
const cookieParser = require('cookie-parser');

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser('heiu'));
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true })
app.use('/api/auth',authRouteApi)
app.use('/api/transaction',transactionRouteApi)
app.use('/api/book',bookRouteApi)
app.use('/api/user',userRouteApi)



app.get("/",function(req, res) {
  res.render("index.pug");
});
app.use('/auth',authRoute);
app.use('/users',authMiddleware.login,userRoute);
app.use('/books',sessionMiddleware,bookRoute);
app.use("/transactions",authMiddleware.login,adminMiddleware.admin, transactionRoute);

app.use(function(err, req, res, next) {
  res.status(500)
    res.render("./errors/err.pug",{
      error:err
    });
});


app.use('/cart',cartRoute);
// https://expressjs.com/en/starter/basic-routing.html
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
