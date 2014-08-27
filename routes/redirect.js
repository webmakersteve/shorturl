var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function(req, res) {
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

module.exports = router;
