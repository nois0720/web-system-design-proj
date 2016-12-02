/**
 * Created by daeyoung on 2016-12-01.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
var testCanvas = require('../controllers/testCanvasController');
router.get('/', testCanvas.testCanvasGet);

router.post('/', testCanvas.testCanvasPost);


module.exports = router;
