#!/usr/bin/env_python3
import traceback
from obelix import Obelix
from obelix_joystick import ObelixJoystick
from flask import Flask, render_template, send_from_directory
from random import randint
from obelix_tools import ObelixCommands

if __name__ == "__main__":

    obelix = Obelix()
    obelix.run_listener()

    joystick_analog = ObelixJoystick(obelix)
    joystick_analog.run_auto_trigger()

    app = Flask(__name__)

    @app.route("/")
    def hello():
        return render_template('index.html')


    @app.route("/joystick/<int:axis_x>/<int:axis_y>")
    def joystick(axis_x=0, axis_y=0):
        joystick_analog.set_coords(axis_x, axis_y)
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
        joystick_analog.set_focus(axis_z)
        speed = 10 * (axis_z - 511.5) / 511.5
        return {
            "focus": {
                "speed": round(speed, 1),
                "position": 50,
            }
        }

    @app.route('/static/<path:path>')
    def set_static(path):
        return send_from_directory('static', path)

    app.run(host='0.0.0.0')

    # Fires commands.
    try:
        del obelix
        del joystick_analog
        print("Program finished.")
    except Exception:
        traceback.print_exc()
        print("Command failed.")
    finally:
        print("Program closed.")
