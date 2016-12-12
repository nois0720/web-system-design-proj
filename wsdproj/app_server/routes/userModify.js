var express = require('express');
var router = express.Router();

var AM = require('./../account-modules/account-manager');

router.get('/print', function (req, res) {
    AM.getAllRecords(function (e, accounts) {
        res.render('print', {title: 'Account List', accts: accounts});
    })
});

router.post('/delete', function (req, res) {
    AM.deleteAccount(req.body.id, function (e, obj) {
        if (!e) {
            res.clearCookie('user');
            res.clearCookie('pass');
            req.session.destroy(function (e) {
                res.status(200).send('ok');
            });
        } else {
            res.status(400).send('record not found');
        }
    });
});

router.get('/reset', function (req, res) {
    AM.delAllRecords(function () {
        res.redirect('/print');
    });
});

router.get('*', function (req, res) {
    res.render('404', {title: 'Page Not Found'});
});