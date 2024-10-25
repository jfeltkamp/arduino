#!/usr/bin/env_python3
from flask import Flask, render_template, send_from_directory
from obelix_tools import ObelixParams

app = Flask(__name__)

params = ObelixParams()

@app.route("/")
def hello():
    return render_template('index.html')

@app.route('/static/<path:path>')
def set_static(path):
    return send_from_directory('static', path)


@app.route('/get-config')
def get_config():
    return params.__dict__

@app.route('/refresh-position')
def refresh_position():
    return params.get_position()

@app.route("/joystick/<int:axis_x>/<int:axis_y>")
def joystick(axis_x=0, axis_y=0):
    speed_x = 1500 * (axis_x - 511.5) / 511.5
    speed_y = -1500 * (axis_y - 511.5) / 511.5
    return {
        "vx": round(speed_x),
        "vy": round(speed_y),
    }

@app.route("/focus/<int:axis_z>")
def focus(axis_z=0):
    speed = round(1000 * (axis_z - 511.5) / 511.5)
    return {
        "vf": speed,
    }


# app.run(host='0.0.0.0', port=5151)