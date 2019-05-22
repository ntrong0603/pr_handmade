var express = require('express');
var router = express.Router();

const loginController = require('../../controllers/admin/login.controller');
const productsController =require('../../controllers/admin/products.controller');

const auth = require ('../../middlewares/admin/auth.middleware');

/* Home page. */
router.get('/' ,function(req, res, next) {
  res.render('admin/index', { title: 'Admin Handmade' });
});
/* Products page. */
router.get('/products', productsController.indexProducts);
router.get('/products/:id', productsController.hiddenProduct);
router.get('/products/add', productsController.indexAddProductItem);
router.post('/products/add', productsController.createProductItem);
router.get('/products/edit/:id', productsController.indexEditProductItem);
router.post('/products/edit/:id', productsController.saveEditProductItem);
router.get('/products/delete/:id', productsController.deleteProduct);
/* GET login page. */
// router.get('/login', loginController.login);
// router.post('/login', loginController.postLogin);

/* Category page */


module.exports = router;
