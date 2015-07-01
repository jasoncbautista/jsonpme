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



// Learning how to make a simple Request with node:

// Fake a curl: http://stackoverflow.com/questions/21408263/node-js-http-get-request-gets-a-totally-different-set-of-headers-from-a-curl-req
//



var host = "yoda.p.mashape.com"
var path = "/yoda?sentence=You+will+learn+how+to+speak+like+me+someday.++Oh+wait."

var headers = { 'X-Mashape-Key': 'g4nY5DLOwKmshEIgrtV3YPDWSAjxp1MW52TjsnSYxOwOo3b5gH'
    , 'Accept': 'text/plain'
    , accept: '*/*'
}



var options = {
        host:   host
    ,   port: 443
    ,   path:    path
    ,   headers: headers
    ,   method : "GET"
};


var https = require("https");
var req = https.get(options, function(res){
    console.log("Got response: " + res.statusCode);
    res.on("data", function(chunk) {
        console.log("BODY: " + chunk);
    });

});



req.on('error', function(e) {
      console.log("Got error: " + e.message);
});



