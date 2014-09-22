import json, requests
import logging

from flask import Flask, request, jsonify
app = Flask(__name__)


import pdb




def generate_jsonp(callback_function_name, data):
    data_string = "{'data': True}";
    jsonped = "<script>" + callback_function_name + "(" + data_string  +  "); </script>"
    return jsonped

@app.route ("/jsonpme")
def jsonpme():
    callback_function = request.args.get("callback")
    url = request.args.get("url")
    return generate_jsonp(callback_function, "{}")


@app.route("/helloworld")
def render_success():
    sample_json   =  {"success": True, "data": ["one", "two", "three"]}
    return jsonify(**sample_json) 

if __name__ == "__main__":
    app.run()

