## Overview

A very simple service that makes it possible to convert any JSON api into a JSONP API.

The point of this little service is to avoid cross origin complications. It is meant purely as a
simple way to prototype things quickly on the clientside without needing an intermediate server.


# Service usage:



* Example requires jquery
```
(function($) {
 var regular_json_url = "http://json_only_api.com/some_api";
 var url = 'http://jsonp.me/jsonpme?callback=?&url=' + regular_json_url;

 $.ajax({
type: 'GET',
url: url,
async: false,
jsonpCallback: 'jsonCallback',
contentType: "application/json",
dataType: 'jsonp',
success: function(json) {
    // Here we have our json that we got through our http://jsonp.me service
    console.dir(json);
},
error: function(e) {
console.log(e.message);
}
});

 })(jQuery);



```


# Run it Locally:



1) Start the server
    python app.py

    Now it will be  running as http://localhost:5000/jsonpme


    See above for usage ^ 









## Install

```  sudo apt-get install python-pip ```

``` sudo pip install flask ```
