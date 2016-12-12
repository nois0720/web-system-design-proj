/**
 * Created by daeyoung on 2016-12-09.
 */
var express = require('express');
var router = express.Router();

var modifyLevelCtrl = require('../controllers/modifyLevelController');

router.get('/', modifyLevelCtrl.getLevelListByUserId);
router.post('/userLevel', modifyLevelCtrl.getLevelByUserId);
router.post('/updateLevel', modifyLevelCtrl.updateLevel);
router.post('/deleteLevel', modifyLevelCtrl.deleteLevel);

module.exports = router;