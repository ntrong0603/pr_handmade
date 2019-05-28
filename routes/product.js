var express = require('express');
var router = express.Router();
var controller = require ('../controllers/product.controller');

router.get('/', controller.index);
router.get('/theloai/:id', controller.indexTheLoai);
router.get('/nxb/:id', controller.indexNXB);
router.get('/search', controller.search);
router.get('/detail/:id', controller.indexDetail);

module.exports = router;