var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('bootStrapTest', {  title: 'Signup', countries : CT });
});