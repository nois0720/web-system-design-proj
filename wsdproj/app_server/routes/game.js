/**
 * Created by Nois on 2016. 12. 1..
 */
var express = require('express');
var router = express.Router();
var session = require('express-session');

// Use connect method to connect to the server

var gameCtrl = require('../controllers/gameController');

/* GET home page. */
router.post('/start',gameCtrl.startGame);

router.post('/', gameCtrl.gameResult);

module.exports = router;
