/**
 * Created by Nois on 2016. 12. 10..
 */
var express = require('express');
var router = express.Router();

var AM = require('./../utils/account-manager');

router.get('/', function(req, res) {
    var email = req.query["e"];
    var passH = req.query["p"];
    AM.validateResetLink(email, passH, function(e){
        if (e != 'ok'){
            res.redirect('/');
        } else{
            // save the user's email in a session instead of sending to the client //
            req.session.reset = { email:email, passHash:passH };
            res.render('reset', { title : 'Reset Password' });
        }
    })
});

router.post('/', function(req, res) {
    var nPass = req.body['pass'];
    // retrieve the user's email from the session to lookup their account and reset password //
    var email = req.session.reset.email;
    // destory the session immediately after retrieving the stored email //
    req.session.destroy();
    AM.updatePassword(email, nPass, function(e, o){
        if (o){
            res.status(200).send('ok');
        }	else{
            res.status(400).send('unable to update password');
        }
    })
});

module.exports = router;