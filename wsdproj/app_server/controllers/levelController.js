/**
 * Created by daeyoung on 2016-12-08.
 */

var mongoose = require('mongoose');
var Level = require('../models/level');

var callbackSave = function(model, callback){
    model.save(function(err){
        if(err){
            console.log('err : '+err);
            return;
        } else{
            callback();
        }
    })
}

module.exports.createLevel = function(req, res){
    var level = new Level({
        createTime: req.body.createTime,
        levelTable : req.body.level_arr,
        levelName : req.body.levelName,
        levelDesigner: req.body.levelDesigner
    });

    callbackSave(level, function(){
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
    });
}

module.exports.updateLevel = function(req, res){
    var level = new Level({
        createTime: req.body.createTime,
        levelTable : req.body.level_arr,
        levelName : req.body.levelName,
        levelDesigner: req.body.levelDesigner
    });
}