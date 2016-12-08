/**
 * Created by Nois on 2016. 12. 1..
 */
var express = require('express');
var router = express.Router();
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var uri = "mongodb://localhost:27017/aigodb";
var mongoose = require('mongoose');

// Use connect method to connect to the server
MongoClient.connect(uri, function(err, db) { assert.equal(err, null);
    console.log("Connected successfully to server"); db.close();
});

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("get" + JSON.stringify(req.query));
    res.render('game', {title: 'Express'});
});

router.post('/', function (req, res, next) {
    console.log("post" + JSON.stringify(req.body));
    var sample_arr = req.body.test_array;
    for (var i = 0; i < sample_arr.length; i++) {
        console.log(sample_arr[i]);
    }
    res.render('result', {arr: sample_arr});
});

// var findLevel = function (sessionID, callback) {
//     MongoClient.connect(uri, function (err, db) {
//         assert.equal(err, null);
//         var collection = db.collection('level');
//         collection.find({_id: sessionID}).toArray(function (err, docs) {
//             assert.equal(err, null);
//             callback(docs);
//         });
//         db.close();
//     });
// };
//
// findMemos(req.session.id, function (docs) {
//     if (docs.length === 0) {
//         req.session.save(function () {
//             req.session.memoList = [];
//             res.render('memo-list', {memoList: req.session.memoList});
//             console.log("aaaa");
//         });
//     } else {
//         res.render('memo-list', {memoList: req.session.memoList});
//     }
// });

module.exports = router;
