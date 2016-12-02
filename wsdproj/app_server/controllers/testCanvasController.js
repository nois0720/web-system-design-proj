/**
 * Created by daeyoung on 2016-12-02.
 */

module.exports.testCanvasGet = function(req, res){
    var answer = {ans : [1,1,2,1,1,1,3]};
    res.render('testCanvas', { message: answer });
};

module.exports.testCanvasPost = function(req, res){
    var answer = {ans : [1,1,2,1,1,1,3]};
    res.render('testCanvas', { message: answer });

};