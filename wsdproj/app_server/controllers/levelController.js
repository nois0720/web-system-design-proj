/**
 * Created by daeyoung on 2016-12-08.
 */

var mongoose = require('mongoose');
var Level = require('../models/level');

module.exports.createLevel = function(req, res){
    var level = new Level({
        createTime: req.body.createDate,
        levelTable : req.body.level_arr,
        levelName : req.body.levelName,
        levelDesigner: req.body.levelDesigner
    });

    level.save(function(err){
        if(err){
            console.log('err : '+err);
            return;
        }
    })

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

}