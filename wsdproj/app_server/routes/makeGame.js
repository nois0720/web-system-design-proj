/**
 * Created by daeyoung on 2016-12-07.
 */
/**
 * Created by daeyoung on 2016-12-01.
 */
var express = require('express');
var router = express.Router();

var modifyLevelCtrl = require('../controllers/modifyLevelController');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('make_game', { levelDesigner: req.session.user.user});
});

router.post('/createLevel', modifyLevelCtrl.createLevel);

module.exports = router;