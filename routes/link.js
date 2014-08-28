var express = require('express');
var router = express.Router();

var db = require('../db');
var url_util = require('../url');
var conf = require('../conf');

/* GET home page. */
router.post('/create', function(req,res,next) {
  console.log('hey');
  link = req.body.link || false;

  if (!link) {
    return res.render('error', {
        message: "Please enter a link.",
        error: {}
    });
  }
  db.getNewIndex().then(function(index) {
    var url = url_util.to68(index);
    db.saveLink(url, link);
    res.render("link-added", {link: conf.url() + url, url: url});
  }).catch(function(e) {
    next(e);
  });

});

module.exports = router;
