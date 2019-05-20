var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Admin Handmade' });
});
/* GET products page. */
router.get('/products', function(req, res, next) {
  res.render('admin/products', { title: 'Admin Handmade - Products' });
});

module.exports = router;
