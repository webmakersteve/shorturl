var express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    expressLess = require('express-less'),
    db = require('./db'),
    conf = require('./conf'),
    nconf = conf.nconf,
    url_util = require('./url');

app.use( bodyparser.urlencoded({ extended: true}) );
app.use(express.static( __dirname + '/public'));

app.use('/css', expressLess(__dirname + '/less'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

db.connect().then(function() { // Pass app in so we can listen
  app.get('/', function(req,res) {
      res.render('index', { });
  });

  app.get("/:shorturl*", function(req,res,next) {
      var shorturl = req.params.shorturl || false;

      if (shorturl) {
        db.getLink(shorturl).then(function(url) {
          if (url) {
              return res.redirect(url)
          }

          res.end();
        });

      } else {
        res.end();
        // Link does not exist
      }
  });

  app.post('/link', function(req,res,next) {
    link = req.body.link || false;

    if (!link) {
      return res.end("Please supply a link");
    }
    db.getNewIndex().then(function(index) {
      var url = url_util.to68(index);
      db.saveLink(url, link);
      res.render("link-added", {link: conf.url() + url});
    }).catch(function(e) {
      console.log(e);
      res.render("error", {error: e});
    });

  });

  app.listen(conf.port());
  console.log("Listening on port " + conf.port())


})
