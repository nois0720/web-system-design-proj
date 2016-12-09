/**
 * Created by daeyoung on 2016-12-08.
 */

var mongoose = require('mongoose');
var Level = require('../models/level');

module.exports.createLevel = function(req, res){
    var level = new Level({
        createTime: req.body.createTime,
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

    res.render('index', {});
}