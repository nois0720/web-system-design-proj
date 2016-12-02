/**
 * Created by Nois on 2016. 12. 1..
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("get" + JSON.stringify(req.query));
    res.render('test', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    console.log("post" + JSON.stringify(req.body));
    res.render('test', { title: 'Express' });
});

module.exports = router;
