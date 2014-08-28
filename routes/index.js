var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/:shorturl*', function(req, res, next) {
  var shorturl = req.params.shorturl || false;

  if (shorturl) {
    db.getLink(shorturl).then(function(url) {
      if (url) {
          return res.redirect(url)
      }
      next();

    }).catch(function(err) {
      next(err);
    });
  } else {
    next();
    // Link does not exist
  }
})

module.exports = router;
