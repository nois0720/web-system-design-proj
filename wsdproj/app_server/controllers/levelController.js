/**
 * Created by daeyoung on 2016-12-08.
 */

var mongoose = require('mongoose');
var Level = require('../models/level');
var util = require('../util/util');

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
    var levelDesigner = util.getSessionUser(req);

    Level.find({levelDesigner: levelDesigner}, function (err, obj) {
        if (err) {
            res.render('error', {message: err});
        }
        else if (obj.length == null) {
            res.render('error');
        }
        else {
            res.render('userLevelList', {title: 'Express', levelList: obj, user: levelDesigner});
        }
    });
}


module.exports.getLevelByUserId = function (req, res) {
    var createTime = req.body.createTime; //원래는 req.body.createTime;
    var levelDesigner = util.getSessionUser(req);
    Level.findOne({createTime: createTime, levelDesigner: levelDesigner}, function (err, obj) {
        if (err) {
            res.render('error', {message: err});
        }
        else if (obj == null) {
            res.render('error');
        }
        else {
            res.render('modify_game', {title: 'Express', level: obj, user: levelDesigner});
        }
    });
}

module.exports.updateLevel = function (req, res) {
    var level = new Level({
        createTime: req.body.createTime,
        levelTable: req.body.level_arr,
        levelName: req.body.levelName,
        levelDesigner: req.session.user.user
    });

    Level.update({createTime: level.createTime}, {
        $set: {
            levelName: level.levelName,
            levelDesigner: level.levelDesigner,
            levelTable: level.levelTable
        }
    }, function (err) {
        if (err) {
            console.log('err : ' + err);
            res.render('error', {message: err});
        }
    });

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
};

//delete level
module.exports.deleteLevel = function (req, res) {
    var user = util.getSessionUser(req);
    var createTime = req.body.createTime;
    console.log(createTime);
    Level.remove({createTime: createTime, levelDesigner: req.session.user.user}, function (err) {

    });

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

};