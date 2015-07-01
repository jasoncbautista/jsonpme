var http = require("http");
var url = require('url') ;

var urlParser= require("fast-url-parser");
urlParser.replace();

//    var parsed =  urlParser("http://cool.com/?wassa=123231&url=xx", true);
var server = http.createServer(function(req, res){

    console.log(req.url);
    res.end("---");


    console.log(url.parse(req.url, true).query);


});

server.listen(3000, function(){
    console.log("Server running on 3000");

});




