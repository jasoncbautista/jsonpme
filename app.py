import json, requests
import logging

from flask import Flask, request, jsonify
app = Flask(__name__)



# An extremely simple server. The idea being
# that for a quick prototype, youc an now get
# external JSON by routing it through this JSONP
# passthrough.



import pdb

def generate_jsonp(callback_function_name, url, data):
    # data_string = jsonify(**{ "data": data, "url": url} )
    # We replace \n with proper"
    data_string = data.replace(u"\n",u"")


    jsonped = "" + callback_function_name + "(" + data_string  +  "); "
    return jsonped

@app.route ("/jsonpme")
def jsonpme():

    callback_function = request.args.get("callback")
    json_url = request.args.get("url")

    # Fetch JSON

    resp = requests.get(url=json_url)
    # TODO check response didnt fail...
    data = json.loads(resp.text)

    return generate_jsonp(callback_function, json_url, resp.text)


if __name__ == "__main__":
    app.run()

