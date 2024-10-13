# save this as app.py
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/joystick/<int:x_axis>/<int:y_axis>")
def joystick(x_axis=0, y_axis=0):
    print('Howdy! ', x_axis, y_axis)
    return {
        "result": "success"
    }

@app.route('/static/<path:path>')
def send_report(path):
    return send_from_directory('static', path)
