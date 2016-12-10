/**
 * Created by daeyoung on 2016-12-09.
 */
var express = require('express');
var router = express.Router();

var levelCtrl = require('../controllers/levelController');

/* GET home page. */


router.get('/', levelCtrl.getLevelListByUserId);

router.post('/userLevel', levelCtrl.getLevelByUserId);

router.post('/updateLevel', levelCtrl.updateLevel);

router.post('/deleteLevel', levelCtrl.deleteLevel);

module.exports = router;