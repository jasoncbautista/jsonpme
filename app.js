var _ = require("underscore");
var http = require("http");
var url = require('url') ;

var urlParser= require("fast-url-parser");
urlParser.replace();

//    var parsed =  urlParser("http://cool.com/?wassa=123231&url=xx", true);
var server = http.createServer(function(req, res){

    console.log(req.url);
    res.end("---");

    var params = url.parse(req.url, true).query;
    console.log(params);
    console.log('url=', params['url']);

});

server.listen(3000, function(){
    console.log("Server running on 3000");
});

var makeCall= function( /* host, path, headers, */ options,   cb){
    var host = "yoda.p.mashape.com"
    var path = "/yoda?sentence=You+will+learn+how+to+speak+like+me+someday.++Oh+wait."

    var headers = { 'X-Mashape-Key': 'g4nY5DLOwKmshEIgrtV3YPDWSAjxp1MW52TjsnSYxOwOo3b5gH'
        , 'Accept': 'text/plain'
    }

    var https = require("https");

    var defaults = {
            host:   host
        ,   port: 443
        ,   path:    path
        ,   headers: headers
        ,   method : "GET" // Method
    };


    var compiledOptions = _.extend(defaults, options);

    // Making the call to our thirdparty REST API:
    var response = "";
    var req = https.get(compiledOptions , function(res){
        console.log("Got response: " + res.statusCode);

        res.on("data", function(chunk) {
            console.log("BODY: " + chunk);
            response += chunk;
        });

        res.on('end', function () {
            console.log('The end');
            cb(response);
        });
    });

    req.on('error', function(e) {
        console.log("Got error: " + e.message);
    });

};


// Simple test
_.each({"one": 1, "two": 2}, function(value, key){
    console.log(key, value);

});


var options = {
};

makeCall(options, function(response){
        console.log('cb fired', response);

});
