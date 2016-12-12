var mongoose = require('mongoose');
var Level = require('../models/level');
var util = require('../utils/util');

var callbackSave = function (model, callback) {
    model.save(function (err) {
        if (err) {
            console.log('err : ' + err);
            return;
        } else {
            callback();
        }
    })
}

module.exports.createLevel = function (req, res) {
    var user = util.getSessionUser(req);
    var level = new Level({
        createTime: req.body.createTime,
        levelTable: req.body.level_arr,
        levelName: req.body.levelName,
        levelDesigner: req.session.user.user
    });
    callbackSave(level, function () {
        Level.find({}, function (err, obj) {
            if (err) {
                console.log('err : ' + err);
                res.render('error', {message: err});
            } else if (obj.length == 0) {
                res.render('error', {message: 'levelList does not exist!! lololololol'});
            }
            else {
                res.render('index', {title: 'levelList', levelList: obj, user: user});
            }
        });
    });
}

module.exports.getLevelListByUserId = function (req, res) {
    var user = util.getSessionUser(req);

    Level.find({levelDesigner: user}, function (err, obj) {
        if (err) {
            res.render('error', {message: err});
        }
        else if (obj.length == null) {
            res.render('error');
        }
        else {
            res.render('userLevelList', {title: 'Express', levelList: obj, user: user});
        }
    });
}


module.exports.getLevelByUserId = function (req, res) {
    var user = util.getSessionUser(req);
    Level.findOne({createTime: req.body.createTime, levelDesigner: user}, function (err, obj) {
        if (err) {
            res.render('error', {message: err});
        }
        else if (obj == null) {
            res.render('error');
        }
        else {
            res.render('modify_game', {title: 'Express', level: obj, user: user});
        }
    });
}

module.exports.updateLevel = function (req, res) {
    Level.update({createTime: req.body.createTime}, {
        $set: {
            levelName: req.body.levelName,
            levelDesigner: req.session.user.user,
            levelTable: req.body.level_arr
        }
    }, function (err) {
        if (err) {
            console.log('err : ' + err);
            res.render('error', {message: err});
        }
        else {
            Level.find({levelDesigner: req.session.user.user}, function (err, obj) {
                if (err) {
                    console.log('err : ' + err);
                    res.render('error', {message: err});
                } else if (obj.length == 0) {
                    res.render('error', {message: 'levelList does not exist!! lololololol'});
                }
                else {
                    res.render('userLevelList', {title: 'levelList', levelList: obj, user: req.session.user.user});
                }
            });
        }
    });
};

//delete level
module.exports.deleteLevel = function (req, res) {
    var user = util.getSessionUser(req);

    Level.remove({createTime: req.body.createTime, levelDesigner: req.session.user.user}, function (err) {
        if (err) {
            console.log('err : ' + err);
            res.render('error', {message: err});
        } else {
            Level.find({/*userId를 통해서 리스트를 받아와야함*/}, function (err, obj) {
                if (err) {
                    console.log('err : ' + err);
                    res.render('error', {message: err});
                } else if (obj.length == 0) {
                    res.render('userLevelList', {levelList: [], user: user});
                }
                else {
                    res.render('userLevelList', {title: 'levelList', levelList: obj, user: user});
                }
            });
        }
    });
};