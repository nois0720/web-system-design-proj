var express = require('express');
var router = express.Router();
var gameCtrl = require('../controllers/gameController');
var navCtrl = require('../controllers/navController');

router.get('/', gameCtrl.getLevelList);
router.get('/about', navCtrl.getAboutPage);
module.exports = router;
