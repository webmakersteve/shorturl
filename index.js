var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./db'),
    conf = require('./conf'),
    nconf = conf.nconf,
    path = require('path');

var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

app.use(express.static( __dirname + '/public'));

app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/** routes **/

app.use('/', require('./routes/index'));
app.use('/link', require('./routes/link'));


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

db.connect().then(function() { // Pass app in so we can listen

  app.listen(conf.port());
  console.log("Listening on port " + conf.port())

})
