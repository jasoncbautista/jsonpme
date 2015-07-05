var _ = require("underscore");
var http = require("http");
var url = require('url') ;
var https = require("https");

var urlParser= require("fast-url-parser");
urlParser.replace();

//    var parsed =  urlParser("http://cool.com/?wassa=123231&url=xx", true);
var server = http.createServer(function(req, res){

    console.log(req.url);

    var params = url.parse(req.url, true).query;
    gotRequest(res, params);

});

server.listen(3000, function(){
    console.log("Server running on 3000");
});



/**
 *
 * @param {type} params,
 * @return {Null}
 */
var gotRequest = function(res, params){

    console.log(params);
    console.log('host=', params['host']);
    console.log('port=', params['port']);
    console.log('callback=', params['callback']);
    console.log('headers=', params['headers']);

    var jsonPCallbackName = params['callback'];


    delete params['callback'];
    delete params['_'];
    console.log("jsonPCallbackName", jsonPCallbackName);

    var cleanParams = params;

    // TODO: make sure to not clip off anything that is actually necessary:
    // If port is null, we can determine the port number here:
    cleanParams['host'] = cleanParams['host'].replace("http://", "")
    cleanParams['host'] = cleanParams['host'].replace("https://", "")

    makeCall(cleanParams , function(response){

        console.log('cb fired', response);

        var jsonped = "" +  jsonPCallbackName + "(" + response +  "); ";
        res.end(jsonped);
    });
};



/**
 *
 * @param {type} host,
 * @param {type} path,
 * @param {type} headers,
 * @param {type} options,
 * @param {type} cb,
 * @return {Null}
 */
var makeCall= function( /* host, path, headers, */ options,   cb){



    // Dummy Data just in case the user doesn't provide anything:
    /*
    var host = "yoda.p.mashape.com"
    var path = "/yoda?sentence=You+will+learn+how+to+speak+like+me+someday.++Oh+wait."

    var headers = { 'X-Mashape-Key': 'g4nY5DLOwKmshEIgrtV3YPDWSAjxp1MW52TjsnSYxOwOo3b5gH'
        , 'Accept': 'text/plain'
    }

    */
    var defaults = {
            host:  ""
        ,   port: 443
        ,   path:   ""
        ,   headers: {  'accept': '*/*'  }
        ,   method : "GET"
    };


    var compiledOptions = _.extend(defaults, options);
    console.log(compiledOptions);
    console.log("Making Call to External RESTFUL API");

    // Making the call to our thirdparty REST API:
    var response = "";
    var httpObj = https;

    // TODO: choose for the user .. which port
    if(compiledOptions.port === 80){
        httpObj = http;
    }



    var req = httpObj.get(compiledOptions , function(res){
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


