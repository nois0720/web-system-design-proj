var express = require('express');
var router = express.Router();

var loginController = require('../controllers/accountController');

router.post('/', loginController.logoutProcess);

module.exports = router;