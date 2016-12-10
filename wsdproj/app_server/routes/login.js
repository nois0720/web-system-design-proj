/**
 * Created by Nois on 2016. 12. 10..
 */
var express = require('express');
var router = express.Router();

var AM = require('./../account-modules/account-manager');

router.get('/', function(req, res){
    // check if the user's credentials are saved in a cookie //
    if (req.cookies.user == undefined || req.cookies.pass == undefined){
        res.render('login.jade', { title: 'Hello - Please Login To Your Account' });
    }	else{
        // attempt automatic login //
        AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
            if (o != null){
                req.session.user = o;
                res.redirect('/home');
            }	else{
                res.render('login.jade', { title: 'Hello - Please Login To Your Account' });
            }
        });
    }
});

router.post('/', function(req, res){
    AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
        if (!o){
            res.status(400).send(e);
        }	else{
            req.session.user = o;
            if (req.body['remember-me'] == 'true'){
                res.cookie('user', o.user, { maxAge: 900000 });
                res.cookie('pass', o.pass, { maxAge: 900000 });
            }
            res.status(200).send(o);
        }
    });
});

router.post('/logout', function(req, res){
    res.clearCookie('user');
    res.clearCookie('pass');
    req.session.destroy(function(e){ res.status(200).send('ok'); });
})

module.exports = router;