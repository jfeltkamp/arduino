#!/usr/bin/env_python3
from flask import Flask, render_template, send_from_directory, send_file
from obelix_tools import ObelixParams
from obelix_navigation import ObelixNavigation
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

params = ObelixParams()

@socketio.on('connect')
def connect():
    emit('message', params.get_position())


@app.route("/")
def hello():
    return render_template('index.html')

@app.route('/static/<path:path>')
def set_static(path):
    return send_from_directory('static', path)

@app.route('/get-navigation')
def get_navigation():
    return {
        "geo": {
            "addr": "Wischhofsweg 4",
            "lat": 53.606071,
            "lon": 9.902575,
        },
        "base": {
            "home": {
                "name": "Home",
                "pos": {
                    "x": -23900,
                    "y": 0,
                    "f": 500
                }
            },
            "polaris": {
                "name": "Polaris",
                "pos": {
                    "x": 0,
                    "y": 11912,
                    "f": 600,
                }
            }
        },
        "custom": [
              {
                "name": "Elisabeth Kirche",
                "pos": {
                    "x": -3000,
                    "y": 250,
                    "f": 400
                }
              }
        ]
    }

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

@app.route('/camera/stream.jpg')
def camera_stream():
    return send_file('./static/img/Joachim.jpg')

# app.run(host='0.0.0.0', port=5151)