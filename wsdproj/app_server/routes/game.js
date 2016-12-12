var express = require('express');
var router = express.Router();
var session = require('express-session');

var gameCtrl = require('../controllers/gameController');

router.post('/', gameCtrl.gameResult);
router.post('/start', gameCtrl.startGame);
router.get('/start', gameCtrl.startGame);

module.exports = router;
