var express = require('express');
var router = express.Router();

const loginController = require('../../controllers/admin/login.controller');
const productsController =require('../../controllers/admin/products.controller');

const auth = require ('../../middlewares/admin/auth.middleware');

/* GET home page. */
router.get('/' ,function(req, res, next) {
  res.render('admin/index', { title: 'Admin Handmade' });
});
/* GET products page. */
router.get('/products', productsController.index);
router.get('/products/add', productsController.create);
/* GET login page. */
router.get('/login', loginController.login);

router.post('/login', loginController.postLogin);

module.exports = router;
