var express = require('express');
var router = express.Router();
var controller = require ('../controllers/user.controller');

/* GET users listing. */
router.get('/', controller.index);
router.post('/', controller.signIn);
router.get('/signup', controller.signUp);
router.post('/signup', controller.createAcc);
router.get('/logout', controller.logOut);

module.exports = router;
