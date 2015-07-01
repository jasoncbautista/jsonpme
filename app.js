var http = require("http");



var server = http.createServer(function(req, res){

    console.log(req.url);
    //console.log(req);
    //console.log(res);
    res.end("---");

});

server.listen(3000, function(){
    console.log("Server running on 3000");

});




