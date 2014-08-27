var nconf = require('nconf');

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//
nconf.argv()
     .env()
     .file({ file: 'config.json' });

var baseURL = "http://ferntastic-shortening.herokuapp.com";
nconf.set('url', rootURL);

var rootURL = "";

module.exports.port = function() {
  var env = nconf.get('NODE_ENV') || 'dev';
  var port = nconf.get('PORT') || false;

  var firstRootURL = !rootURL || false;

  if (firstRootURL)
    rootURL += baseURL;

  if (!port) {
    // Port overrides all
    if (env == 'production')
      port = 80;
    else port = 3000;

    if (firstRootURL)
      rootURL += ":" + port;

  }

  if (firstRootURL)  {
    rootURL += '/';
    nconf.set('url', rootURL);
  }

  return port;
}

module.exports.url = function() {
  return nconf.get('url');
}

module.exports.nconf = nconf;
