/**
 * Created by daeyoung on 2016-12-09.
 */
var express = require('express');
var router = express.Router();

var levelCtrl = require('../controllers/levelController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('modify_game', { title: 'Express'});
});

router.post('/updateLevel', levelCtrl.updateLevel);

module.exports = router;