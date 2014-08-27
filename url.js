'use strict';

var to68 = function (num) {

  // Base 66
  var nums = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~"; //a is 0
  // Now that we have the nums we can just use powers to convert the base
  var remainder = num,
      base = nums.length,
      index,
      temp,
      returnstr = "",
      charAt = '';

  if (num < base) {
    return nums[num];
  }

  for (var i = 0; Math.pow(base,i) < remainder; i++) {

  }
  i--;

  while ( i >= 0 ) {
    index = Math.pow(base,i); //calculate the current base

    modulus = remainder % index;
    // Modulus will become the new remainder

    temp = (remainder - modulus) / index;
    returnstr += nums[temp];

    remainder = modulus;

    i--;
  }
  returnstr = returnstr.split("").reverse().join("");
  return returnstr;

}

var from68 = function (string) {
  // Base 66
  var nums = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~";
  var characters = string.split("").reverse();

  var base = nums.length,
      i = 0,
      total = 0;

  // Iterate through each character
  for (var x in characters) {
    total += nums.indexOf(characters[x]) * Math.pow(base,i);
    i++;
  }

  return total;

}

module.exports = {
  from68: from68,
  to68: to68
}
