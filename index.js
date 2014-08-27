var redis = require("redis"),
    client = redis.createClient(),
    express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    expressLess = require('express-less'),
    when = require('when');

app.use( bodyparser.urlencoded({ extended: true}) );
app.use(express.static( __dirname + '/public'));

app.use('/css', expressLess(__dirname + '/less'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var rootURL = "http://localhost:3000/";


client.on("error", function (err) {
    console.log("Error " + err);
});

client.on("connect", function() {
    app.listen(3000);
});

app.get('/', function(req,res,next) {
    res.render('index', { });
});

app.get("/:shorturl*", function(req,res,next) {
    var shorturl = req.params.shorturl || false;

    if (shorturl) {
      client.get("link_" + shorturl, function(err,url) {
      	if (err) return;

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
  getNewIndex().then(function(index) {
    var url = to66(index);
    client.set( "link_" + url, link );
    res.render("link-added", {link: rootURL + url});
  }).catch(function(e) {
    res.render("error", {error: e});
  });

});


function to66 (num) {

  // Base 66
  var nums = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~"; //a is 0
  // Now that we have the nums we can just use powers to convert the base
  var remainder = num,
      base = nums.length,
      index,
      temp,
      returnstr = "",
      charAt = '';

  for (var i = 0; Math.pow(base,i) < remainder; i++) {

  }
  i--;

  while ( i >= 0 ) {
    index = Math.pow(base,i); //calculate the current base

    modulus = remainder % index;
    // Modulus will become the new remainder

    temp = (remainder - modulus) / index;
    console.log(temp + " at " + base + "^" + i);
    returnstr += nums[temp];

    remainder = modulus;

    i--;
  }
  returnstr = returnstr.split("").reverse().join("");
  return returnstr;

}

function from66 (string) {
  // Base 66
  var nums = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~";
  var characters = string.split("").reverse();

  var base = nums.length,
      i = 0,
      total = 0;

  // Iterate through each character
  for (var x in characters) {
    console.log( i + 1 )
    total += nums.indexOf(characters[x]) * Math.pow(base,i);
    i++;
  }

  return total;

}

console.log( to66(5108360676096) )

function getNewIndex() {
  return when.promise(function(resolve,reject,notify) {
    client.send_command("eval", ["return #redis.call('keys', 'link_*')", "0"], function(err,result) {
      if (err) return reject(err);
      else resolve(result);
    });
  })
}
