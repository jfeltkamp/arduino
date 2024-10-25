#!/usr/bin/env_python3
import traceback
from obelix import Obelix
from obelix_analog import ObelixAnalog
from flask import Flask, render_template, send_from_directory

if __name__ == "__main__":

    obelix = Obelix()
    obelix.run_listener()

    joystick_analog = ObelixAnalog(obelix)
    joystick_analog.enable()

    app = Flask(__name__)

    @app.route("/")
    def hello():
        return render_template('index.html')

    # Deliver static files.
    @app.route('/static/<path:path>')
    def set_static(path):
        return send_from_directory('static', path)

    # Deliver initial config to frontend.
    @app.route('/get-config')
    def get_config():
        return obelix.params.__dict__

    # Deliver position to refresh.
    @app.route('/refresh-position')
    def refresh_position():
        return obelix.params.get_position()

    # Receive signals from virtuell Joystick.
    @app.route("/joystick/<int:analog_x>/<int:analog_y>")
    def joystick(analog_x=0, analog_y=0):
        return joystick_analog.set_axis_speed(analog_x, analog_y)

    @app.route("/focus/<int:analog_f>")
    def focus(analog_f=0):
        return joystick_analog.set_focus_speed(analog_f)

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
