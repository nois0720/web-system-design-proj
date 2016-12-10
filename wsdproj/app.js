// app.locals.pretty = true;
// app.set('port', process.env.PORT || 3000);

// var dbHost = process.env.DB_HOST || 'localhost'
// var dbPort = process.env.DB_PORT || 27017;
// var dbName = process.env.DB_NAME || 'node-login';

// var dbURL = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
var game = require('./app_server/routes/game');
var makeGame = require('./app_server/routes/makeGame');

var bootStrap = require('./app_server/routes/bootStrap');
var modifyGame = require('./app_server/routes/modifyGame');
var test = require('./app_server/routes/test');
var login = require('./app_server/routes/login');
var logout = require('./app_server/routes/logout');
var resetPassword = require('./app_server/routes/resetPassword');
var lostPassword = require('./app_server/routes/lostPassword');
var signup = require('./app_server/routes/signup');

var mongoose = require('mongoose');

var app = express();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/aigodb');

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('stylus').middleware({src: __dirname + 'public'}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: require('mongoose-session')(mongoose)
}));

app.use('/', index);
app.use('/users', users);
app.use('/game', game);
app.use('/makeGame', makeGame);
app.use('/bootstrap', bootStrap);
app.use('/modifyGame', modifyGame);
app.use('/test', test);
app.use('/login', login);
app.use('/logout', logout);
app.use('/reset-password', resetPassword);
app.use('/lost-password', lostPassword);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
