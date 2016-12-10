/**
 * Created by daeyoung on 2016-12-09.
 */
/**
 * Created by daeyoung on 2016-12-08.
 */

var mongoose = require('mongoose');
var Level = require('../models/level');

module.exports.startGame = function (req, res) {
    console.log('넘어온 id'+req.body.createTime);

    var createTime = req.body.createTime;
    var level = new Level();

    Level.findOne({createTime:createTime }, function (err, obj) {
        if (err) {
            console.log('err : ' + err);
            res.render('error', {message : err});
        }
        else if(obj == null){
            res.render('error');
        }
        else {
            //console.log(obj.levelTable);
            res.render('game', {title: 'Express', level: obj.levelTable});
        }
    });
};

module.exports.getLevelList = function(req, res){
    var level = new Level();

    Level.find({}, function(err, obj){
        if (err) {
            console.log('err : ' + err);
            res.render('error', {message : err});
        } else if(obj.length==0){
            res.render('error', {message : 'levelList does not exist!! lololololol'});
        }
        else {
            res.render('index', {title: 'levelList', levelList: obj});
        }
    });
};