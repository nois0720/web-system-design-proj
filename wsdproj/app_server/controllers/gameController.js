var Level = require('../models/level');
var util = require('../utils/util');

module.exports.startGame = function (req, res) {
    var user = util.getSessionUser(req);
    var createTime = req.body.createTime;
    var createTime2 = req.query.createTime;

    Level.findOne({createTime: (createTime==null || createTime=="") ? createTime2:createTime}, function (err, obj) {
        if (err) {
            console.log(err);
            res.render('error', {message: err});
        }
        else if (obj == null) {
            res.render('error');
        }
        else {
            res.render('game', {title: 'Express', level: obj.levelTable, createTime: obj.createTime, user: user});
        }
    });
};

module.exports.gameResult = function (req, res) {
    var user = util.getSessionUser(req);

    var sample_arr = req.body.test_array;
    var createTime = req.body.createTime;

    Level.findOne({createTime: createTime}, function (err, obj) {
        if (err) {
            res.render('error');
        }
        else if (obj == null) {
            res.render('error');
        }
        else {
            res.render('result', {arr: sample_arr, levelTable: obj.levelTable, user: user, createTime:createTime});
        }
    });
};

module.exports.getLevelList = function (req, res) {
    var user = util.getSessionUser(req);

    Level.find({}, function (err, obj) {
        if (err) {
            console.log('err : ' + err);
            res.render('error', {message: err});
        } else if (obj.length == 0) {
            res.render('index', {levelList: [], user: user});
        }
        else {
            res.render('index', {levelList: obj, user: user});
        }
    });
};