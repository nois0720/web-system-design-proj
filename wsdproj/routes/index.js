var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("mongo db connection OK.");
});

var testSchema = mongoose.Schema;
var testModel = new testSchema({
    name: String,
    id: Number,
    address: String
});

var model = mongoose.model('model', testModel, 'model');


/* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('index', {title: 'Express'});
// });

router.get('/', function (req, res, next) {
    model.find({}, function (err, data) {
        res.render('index', {data: data});
    });
});

module.exports = router;
