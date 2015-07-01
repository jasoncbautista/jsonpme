var http = require("http");

var server = http.createServer(function(req, res){

    console.log(req.url);
    res.end("---");

});

server.listen(3000, function(){
    console.log("Server running on 3000");

});




