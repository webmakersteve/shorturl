'use strict';

function randChar() {
  // return a random character
}

function randStr(n) {
  var result = "";
  for (var i = 0; i < n; i++) {
    result += randChar();
  }
  return result;
}

module.exports = exports = randStr;
