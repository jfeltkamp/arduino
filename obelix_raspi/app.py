#!/usr/bin/env_python3
import traceback
from obelix import Obelix
from obelix_analog import ObelixAnalog
from obelix_navigation import ObelixNavigation
from flask import Flask, Response, render_template, send_from_directory, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS

if __name__ == "__main__":
    app = Flask(__name__, static_url_path='')
    app.config['SECRET_KEY'] = 'secret!'
    socketio = SocketIO(app, cors_allowed_origins="*")
    cors = CORS(app)


    obelix = Obelix(socketio)
    obelix.run_listener()

    joystick_analog = ObelixAnalog(obelix)
    joystick_analog.enable()

    navigation = ObelixNavigation(obelix)

    @socketio.on('connect')
    def connect():
        emit('message', obelix.params.get_position())

    @app.route("/")
    def index():
        return render_template('index.html')

    # Deliver static files.
    @app.route('/static/<path:path>')
    def set_static(path):
        return send_from_directory('static', path)

    # Deliver initial config to frontend.
    @app.route('/get-config')
    def get_config():
        return obelix.params.__dict__

    # Receive signals from virtuell Joystick.
    @app.route("/joystick/<int:analog_x>/<int:analog_y>")
    def joystick(analog_x=0, analog_y=0):
        return joystick_analog.set_axis_speed(analog_x, analog_y)

    @app.route("/focus/<int:analog_f>")
    def focus(analog_f=0):
        return joystick_analog.set_focus_speed(analog_f)

    @app.route("/adjust/<string:direction>/<string:length>")
    def adjust(direction="none", length="0"):
        return joystick_analog.adjust(direction, int(length))

    # Navigation
    @app.route('/navi/location-list')
    def get_location_list():
        return navigation.get_location_list()

    @app.route('/navi/location/<string:fid>')
    def get_navigation(fid):
        return navigation.get_navigation(fid)

    @app.route('/navi/location/delete/<string:fid>')
    def delete_location(fid):
        return navigation.delete_location(fid)

    @app.route('/navi/position/<string:nav_id>')
    def navigate(nav_id):
        pos = navigation.navigate(nav_id)
        obelix.params.get_deg_from_coords(pos)
        return pos

    @app.route('/navi/position/update/<string:file_id>', methods=['POST'])
    def position_update(file_id):
        data = request.json
        return navigation.position_update(file_id, data)

    # Camera
    @app.route("/cam/ctrl/<string:param>/<string:value>")
    def cam_control(param="", value=""):
        return obelix.camera.set_control(param=param, value=value)

    @app.route("/cam/controls", methods=['POST'])
    def cam_controls():
        values = request.json
        return obelix.camera.set_controls(values)

    @app.route('/camera/stream')
    def camera_stream():
        obelix.camera.start_stream()
        return Response(obelix.camera.generate_frames(), mimetype='application/x-multipart-replace; boundary=frame')


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
