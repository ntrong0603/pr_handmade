const express = require('express');
const router = express.Router();
const multer = require ('multer');
const upload = multer({ dest: './uploads/products/' })

const loginController = require('../../controllers/admin/login.controller');
const productsController = require('../../controllers/admin/products.controller');
const categoryController = require('../../controllers/admin/category.controller');
const publishersController = require('../../controllers/admin/publishers.controller');

const auth = require ('../../middlewares/admin/auth.middleware');

/* Home page. */
router.get('/' ,function(req, res, next) {
  res.render('admin/index', { title: 'Admin Handmade' });
});
/* Products page. */
router.get('/products', productsController.indexProducts);
router.get('/products/hidden/:id', productsController.hiddenProduct);
router.get('/products/hot/:id', productsController.hotProduct);
router.get('/products/add', productsController.indexAddProductItem);
router.post('/products/add', upload.single('avata'), productsController.createProductItem);
router.get('/products/edit/:id', productsController.indexEditProductItem);
router.post('/products/edit/:id', upload.single('avata'), productsController.saveEditProductItem);
router.get('/products/delete/:id', productsController.deleteProduct);
/* GET login page. */
// router.get('/login', loginController.login);
// router.post('/login', loginController.postLogin);

/* Category page */
router.get('/categorys', categoryController.indexCategorys);
router.get('/categorys/add', categoryController.indexAddCategory);
router.post('/categorys/add', categoryController.createCategory);
router.get('/categorys/edit/:id', categoryController.indexEditCategory);
router.post('/categorys/edit/:id', categoryController.saveEditCategiry);
router.get('/categorys/delete/:id', categoryController.deleteCategory);

/* Publishers page */
router.get('/publishers', publishersController.indexPublishers);
router.get('/publishers/add', publishersController.indexAddPublisher);
router.post('/publishers/add', publishersController.createPublisher);
router.get('/publishers/edit/:id', publishersController.indexEditPublisher);
router.post('/publishers/edit/:id', publishersController.saveEditPublisher);
router.get('/publishers/delete/:id', publishersController.deletepublisher);

module.exports = router;
