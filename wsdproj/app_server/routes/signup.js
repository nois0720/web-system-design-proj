var express = require('express');
var router = express.Router();

var CT = require('./../utils/country-list');
var AM = require('./../utils/account-manager');

router.get('/', function(req, res) {
    res.render('signup.jade', {  title: 'Signup', countries : CT });
});

router.post('/', function(req, res){
    AM.addNewAccount({
        name 	: req.body['name'],
        email 	: req.body['email'],
        user 	: req.body['user'],
        pass	: req.body['pass'],
        country : req.body['country']
    }, function(e){
        if (e){
            res.status(400).send(e);
        }	else{
            res.status(200).send('ok');
        }
    });
});

module.exports = router;