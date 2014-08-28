var nconf = require('nconf');

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//
nconf.argv()
     .env()
     .file({file: 'config/config.json'});

var NODE_ENV = function() {
  var env = nconf.get('NODE_ENV') || 'dev';
  return env;
}

nconf.file({ file: 'config/' + NODE_ENV()+'.json' });

module.exports.port = function() {
  var port = nconf.get('PORT') || 3000;
  if (!port) {
    // Port overrides all
    if (NODE_ENV() == 'production')
      port = 80;
    else port = 3000;

  }

  return port;
}

module.exports.url = function() {
  return nconf.get('baseURL') || "http://91f.co/";
}

module.exports.nconf = nconf;

module.exports.env = NODE_ENV;
