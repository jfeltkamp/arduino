#!/usr/bin/env_python3
from flask import Flask, render_template, send_from_directory
from random import randint

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/joystick/<int:axis_x>/<int:axis_y>")
def joystick(axis_x=0, axis_y=0):
    speed_x = 10 * (axis_x - 511.5) / 511.5
    speed_y = 10 * (axis_y - 511.5) / 511.5
    return {
        "axis_x": {
            "speed": round(speed_x, 1),
            "position": randint(0,360),
        },
        "axis_y": {
            "speed": round(speed_y, 1),
            "position": randint(0,90),
        }
    }

@app.route("/focus/<int:axis_z>")
def focus(axis_z=0):
    print("Focus: ", axis_z)
    speed = 10 * (axis_z - 511.5) / 511.5
    return {
        "focus": {
            "speed": round(speed, 1),
            "position": randint(0,100),
        }
    }

@app.route('/static/<path:path>')
def set_static(path):
    return send_from_directory('static', path)


# app.run(host='0.0.0.0', port=5151)