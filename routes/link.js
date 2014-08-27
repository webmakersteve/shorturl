var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.post('/', function(req,res,next) {
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

module.exports = router;
