/**
 * Created by daeyoung on 2016-12-07.
 */
/**
 * Created by daeyoung on 2016-12-01.
 */
var express = require('express');
var router = express.Router();

var levelCtrl = require('../controllers/levelController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('make_game', { title: 'Express'});
});

router.post('/createLevel', levelCtrl.createLevel);

module.exports = router;