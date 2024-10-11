# save this as app.py
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def hello(name=None):
    name = name or "World"
    return render_template('index.html', person=name)


@app.route('/static/<path:path>')
def send_report(path):
    return send_from_directory('static', path)

# app.run(host="0.0.0.0", port=5588)