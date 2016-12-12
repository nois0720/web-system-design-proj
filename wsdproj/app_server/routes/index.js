var express = require('express');
var router = express.Router();
var gameCtrl = require('../controllers/gameController');

router.get('/', gameCtrl.getLevelList);

module.exports = router;
