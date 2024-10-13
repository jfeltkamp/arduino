#!/usr/bin/env_python3
import traceback
from obelix import Obelix
from obelix_joystick import ObelixJoystick
from flask import Flask, render_template, send_from_directory

if __name__ == "__main__":

    obelix = Obelix()
    obelix.run_listener()

    joystick_analog = ObelixJoystick(obelix)
    joystick_analog.run_auto_trigger()

    app = Flask(__name__)

    @app.route("/")
    def hello():
        return render_template('index.html')


    @app.route("/joystick/<int:x_axis>/<int:y_axis>")
    def joystick(x_axis=0, y_axis=0):
        joystick_analog.set_coords(x_axis, y_axis)
        return {
            "result": "success"
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
