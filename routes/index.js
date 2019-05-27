var express = require('express');
var router = express.Router();
var controller = require('../controllers/index.comtroller');

/* GET home page. */
router.get('/', controller.indexPage);

module.exports = router;
