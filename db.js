'use strict';

var redis = require("redis"),
    when = require('when'),
    conf = require('./conf'),
    nconf = conf.nconf;

var getNewIndex = function () {
  return when.promise(function(resolve,reject,notify) {
    client.send_command("eval", ["return #redis.call('keys', 'link_*')", "0"], function(err,result) {
      if (err) return reject(err);
      else resolve(result);
    });
  })
}

var client;

module.exports.connect = function() {
  return when.promise (function (resolve,reject) {
    var REDIS_URL = nconf.get('REDISTOGO_URL') || false;

    if (REDIS_URL) {
      var redisURL = require("url").parse(REDIS_URL);

      client = redis.createClient(redisURL.port, redisURL.hostname);
      client.auth(redisURL.auth.split(":")[1], function(err) {
        // After password is sent
      });
    } else {
      client = redis.createClient();
    }

    client.on("error", function (err) {
        console.log("Error " + err);
        reject(err);
    });

    client.on("connect", function() {


      resolve(client);

    });
  });
}

module.exports.getLink = function (shorturl) {
  var key = "link_" + shorturl;
  return when.promise (function(resolve,reject) {
    client.get(key, function(err,url) {
      if (err) return reject(err);
      return resolve(url);

    });
  });
}

module.exports.saveLink = function (url,link) {
  client.set( "link_" + url, link );
}

module.exports.getNewIndex =  getNewIndex;
