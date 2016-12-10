var express = require('express');
var router = express.Router();
var gameCtrl = require('../controllers/gameController');

/* GET home page. */
router.get('/', gameCtrl.getLevelList);

module.exports = router;
