var express = require("express");
var router = express.Router();
var controller = require('../controller/transactions.controller.js')
router.get('',controller.getTran);
module.exports=router;