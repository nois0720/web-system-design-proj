/**
 * Created by daeyoung on 2016-12-09.
 */
/**
 * Created by daeyoung on 2016-12-08.
 */

var mongoose = require('mongoose');
var Level = require('../models/level');

module.exports.startGame = function (req, res) {

    var createTime = req.body.createTime;
    console.log("asdfadfsa" + createTime)
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
            console.log(obj.createTime);
            res.render('game', {title: 'Express', level: obj.levelTable, createTime : obj.createTime});
        }
    });
};

//send command to result page
module.exports.gameResult = function(req, res){

    var sample_arr = req.body.test_array;
    var createTime = req.body.createTime;

    Level.findOne({createTime:createTime }, function (err, obj) {
        if (err) {
            console.log('디비에러');
            res.render('error');
        }
        else if(obj == null){
            res.render('error');
        }
        else {
            console.log(obj.levelTable);
            res.render('result', {arr: sample_arr, levelTable:obj.levelTable});
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