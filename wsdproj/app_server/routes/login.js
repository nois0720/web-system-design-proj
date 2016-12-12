var express = require('express');
var router = express.Router();

var loginController = require('../controllers/accountController');

router.get('/', loginController.autoLoginProcess);
router.post('/', loginController.loginProcess);

module.exports = router;