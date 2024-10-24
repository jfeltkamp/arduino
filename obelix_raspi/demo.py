#!/usr/bin/env_python3
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/joystick/<int:axis_x>/<int:axis_y>")
def joystick(axis_x=0, axis_y=0):
    speed_x = 1500 * (axis_x - 511.5) / 511.5
    speed_y = 1500 * (axis_y - 511.5) / 511.5
    return {
        "vx": round(speed_x),
        "vy": round(speed_y),
        "spr": 80000
    }

@app.route("/focus/<int:axis_z>")
def focus(axis_z=0):
    print("Focus: ", axis_z)
    speed = round(1000 * (axis_z - 511.5) / 511.5)
    return {
        "vf": speed,
        "acc": 1000,
        "mpf": 5000,
        "vf1": 100,
        "vf2": 1500
    }

@app.route('/static/<path:path>')
def set_static(path):
    return send_from_directory('static', path)


# app.run(host='0.0.0.0', port=5151)