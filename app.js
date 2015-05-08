var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var result = require('./routes/result');
var creator = require('./routes/creatorRoute');
var display = require('./routes/displayRoute');
var submits = require('./routes/submitFunctions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/display', display.display);
app.use('/resultzzz', result);
app.use('/submitcode', submits.submitCode);
//app.use('/create', creator);

app.post('/create', creator.create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

mongoose.connect('mongodb://heroku_app36536831:nirdvg3k5j0p5i804g1u3k5nkc@ds031832.mongolab.com:31832/heroku_app36536831');
var db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', function(callback) {
  console.log("menjadi");
});

/*
app.get('/users', function(req, res, next){
  mongoose.model('user-login').find(function (err, userLogin){
    res.send(userLogin);
  });

  res.send()
});
*/
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
