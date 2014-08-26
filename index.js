var redis = require("redis"),
    client = redis.createClient(),
    express = require('express'),
    app = express(),
    bodyparser = require('body-parser');

app.use( bodyparser.urlencoded({ extended: true}) );

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on("connect", function() {
    app.listen(3000);
});

app.get('/', function(req,res,next) {
    res.end("This is an index response");
});

app.get("/:shorturl*", function(req,res,next) {
    var shorturl = req.params.shorturl || false;
    if (shorturl) {
	console.log(shorturl);
        client.get(shorturl, function(err,data) {
	if (err) return;
	if (data) {
	    console.log(data);
	    res.end(data);
	}
        res.end();
        });        
    } else res.end();
});

app.post('/link', function(req,res,next) {
    link = req.body.link || false;
    if (!link) {
        return res.end("Please supply a link");
    }
    var url = to66(323123);
    client.set( url, link );
    res.end("Link added: " + url + "\n");
});


function to66(num) {
    // Base 66
    var nums = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
    // Now that we have the nums we can just use powers to convert the base
    var remainder = num,
         base = nums.length,
         index,
	 temp,
	 returnstr = "";
    do {
	for (var i = 0; Math.pow(base,i) < remainder; i++) {
	    index = Math.pow(base,i);
	}
 	
	temp = remainder / index;
	remainder = remainder % index;
	
	returnstr += nums[parseInt(temp)-1];

    } while (remainder > 0);

    return returnstr.split("").reverse().join("");

}
