/**
 * Created by daeyoung on 2016-12-09.
 */
/**
 * Created by daeyoung on 2016-12-08.
 */

var mongoose = require('mongoose');
var Level = require('../models/level');

module.exports.startGame = function (req, res) {

    var primary_key = 'tester_ndy'; //나중에 req.params 또는 req.query에서 PK를 조회해와야함
    var level = new Level();

    Level.findOne({levelDesigner: 'DSS'}, function (err, obj) {
        if (err) {
            console.log('err : ' + err);
            res.render('error');
        }
        else if(obj == null){
            res.render('index');
        }
        else {
            console.log(obj.levelTable);
            res.render('game', {title: 'Express', level: obj.levelTable});
        }
    });
}