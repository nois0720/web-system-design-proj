/**
 * Created by Nois on 2016. 12. 10..
 */
var express = require('express');
var router = express.Router();

var AM = require('./../modules/account-manager');
var EM = require('./../modules/email-dispatcher');

router.post('/', function(req, res){
    // look up the user's account via their email //
    AM.getAccountByEmail(req.body['email'], function(o){
        if (o){
            EM.dispatchResetPasswordLink(o, function(e, m){
                // this callback takes a moment to return //
                // TODO add an ajax loader to give user feedback //
                if (!e){
                    res.status(200).send('ok');
                }	else{
                    for (k in e) console.log('ERROR : ', k, e[k]);
                    res.status(400).send('unable to dispatch password reset');
                }
            });
        }	else{
            res.status(400).send('email-not-found');
        }
    });
});

module.exports = router;