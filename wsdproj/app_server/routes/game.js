/**
 * Created by Nois on 2016. 12. 1..
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("get" + JSON.stringify(req.query));
    res.render('game', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    console.log("post" + JSON.stringify(req.body));
    var sample_arr = req.body.test_array;
    for(var i=0;i<sample_arr.length;i++) {
        console.log(sample_arr[i]);
    }
    res.render('result', {arr:sample_arr });
});

module.exports = router;
