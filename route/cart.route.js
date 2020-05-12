var express = require("express");
var router = express.Router();
var controller = require('../controller/cart.controller.js')
router.get('',controller.cart)
router.get('/add/:bookId',controller.addToCart)
router.post('',controller.post)
module.exports=router;