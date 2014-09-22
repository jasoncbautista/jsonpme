import json, requests
import logging

from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/json_api")
def render_json():
    sample_json   =  {"success": True, "data": ["one", "two", "three"]}
    return jsonify(**sample_json) 



@app.route("/helloworld")
def render_helloworld():
    sample_json   =  {"success": True, "data": ["one", "two", "three", {"mini_data": "okay"}]}
    return jsonify(**sample_json) 

if __name__ == "__main__":
    app.run(port=5001)

