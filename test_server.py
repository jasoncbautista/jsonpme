import json, requests
import logging

from flask import Flask, jsonify
app = Flask(__name__)



@app.route("/helloworld")
def render_success():
    sample_json   =  {"success": True, "data": ["one", "two", "three"]}
    return jsonify(**sample_json) 

if __name__ == "__main__":
    app.run(port=5001)

