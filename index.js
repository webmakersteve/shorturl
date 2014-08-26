var redis = require("redis"),
    client = redis.createClient(),
    express = require('express'),
    app = express();

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
