var express = require('express');
var router = express.Router();

router.post('/logout', function(req, res){
    res.clearCookie('user');
    res.clearCookie('pass');
    req.session.destroy(function(e){ res.status(200).send('ok'); });
})

module.exports = router;