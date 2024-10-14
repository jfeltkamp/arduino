#!/usr/bin/env_python3
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/joystick/<int:x_axis>/<int:y_axis>")
def joystick(x_axis=0, y_axis=0):
    print(x_axis, y_axis)
    return {
        "result": "success"
    }

@app.route('/static/<path:path>')
def set_static(path):
    return send_from_directory('static', path)


# app.run(host='0.0.0.0', port=5151)