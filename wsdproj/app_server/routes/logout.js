var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    res.clearCookie('user');
    res.clearCookie('pass');
    req.session.destroy(function (e) {
        res.redirect('/');
    });
})

module.exports = router;