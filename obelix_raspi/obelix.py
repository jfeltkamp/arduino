#!/usr/bin/env_python3
import serial
import traceback
import threading
import time
from obelix_tools import *
from obelix_camera import ObelixCamera

"""
Controls all communication with the arduino.
"""
class Obelix:
    # Serial communication definitions.
    port = '/dev/ttyACM0'
    baudrate = 115200
    timeout = 1.0

    listener_runs = False
    params = ObelixParams()
    ser_listener = None
    cmd_listener = None

    command_list = []

    # Allow incoming analog commands.
    # If TRUE no incoming analog commands will be executed.
    # Use case: During execution of programs (e.g. serial shots), disturbing analog commands are locked.
    analog_lock = False

    # INIT: Start serial communication with Arduino and start serial read ser_listener daemon.
    def __init__(self):
        self.cmd_response = ""
        self.camera = ObelixCamera()
        while True:
            try:
                self.ser = serial.Serial(self.port, self.baudrate, timeout=self.timeout)
                time.sleep(3)
                self.ser.reset_input_buffer()
                print("Obelix: Serial connection OK.")
                break
            except serial.SerialException:
                print("Obelix: Could not connect to serial.")
                time.sleep(1)

    def __del__(self):
        self.ser.close()
        self.listener_runs = False
        self.ser_listener.join()
        self.cmd_listener.join()
        del self.camera
        del self.params
        print("Obelix: Service closed.")

    # Start ser_listener daemon.
    def run_listener(self):
        self.listener_runs = True
        self.ser_listener = threading.Thread(target=self.serial_read_listener)
        self.ser_listener.start()
        self.cmd_listener = threading.Thread(target=self.command_list_listener)
        self.cmd_listener.start()
        print("Obelix: Listeners running.")

    # Serial read listener (daemon).
    # Runs in infinite loop. Listens to incoming serial messages from Arduino.
    def serial_read_listener(self):
        while self.listener_runs:
            time.sleep(0.3)
            if self.ser.in_waiting > 0:
                try:
                    resp = ObelixPayload(self.ser.readline().decode('utf-8').rstrip())
                    print(resp.status)
                    self.params.set_params_from_response(resp.data)
                    self.arduino_command('ard_lcd', self.params.get_lcd("x"))
                    self.arduino_command('ard_lcd', self.params.get_lcd("y"))
                except Exception:
                    traceback.print_exc()
                    print("Obelix response could not be decoded.")
                
    # Command list listener (daemon).
    # Runs in infinite loop. Listens to incoming commands in the command list.
    def command_list_listener(self):
        while self.listener_runs:
            time.sleep(0.3)
            if len(self.command_list) > 0:
                self.analog_lock = True
                for command in self.command_list:
                    self.command(command)
                self.command_list.clear()
                self.analog_lock = False

    # Extend the command
    # Add single command item or a list of items.
    # Returns false if items have wrong type.
    def command_list_push(self, commands):
        if isinstance(commands, list):
            for command in commands:
                if not isinstance(command, ObelixCommands):
                    return False
            self.command_list.extend(commands)
            return True
        elif isinstance(commands, ObelixCommands):
            self.command_list.append(commands)
            return True
        else:
            return False

    def command(self, command):
        if isinstance(command, ObelixCommands):
            if command.cmd.startswith("ard_"):
                self.arduino_command(command.cmd, command.params + ':' + command.options, (command.options.find('await') != -1))
            elif command.cmd.startswith("cam_"):
                self.camera_command(command.cmd, command.params, command.options)
            else:
                print(f"Obelix: Command {command.cmd} is unknown.")
        else:
            print('Expected instance of ObelixCommands but got %s ' % type(command))


    # Sends commands to Arduino
    # If option set: awaits response before allows to continue. Times out after 60 seconds.
    def arduino_command(self, cmd, param, await_resp=False):
        cmd_serial = f"{cmd}:{param}\n"
        self.ser.write(cmd_serial.encode('utf-8'))
        if await_resp:
            fired_time = time.time()
            while True:
                time.sleep(0.1)
                if self.cmd_response != "":
                    if self.cmd_response.startswith("success"):
                        print(f"Command '{cmd}:{param}' was successful.")
                        self.cmd_response = ""
                        break
                    elif self.cmd_response == "error":
                        raise Exception(f"Error on executing command '{cmd}: {param}'.")
                    else:
                        print(self.cmd_response)
                if time.time() - fired_time > 60:
                    raise Exception(f"Command '{cmd}: {param}' timed out.")

    # Method to give access to analog commands (Joystick or webUI).
    def analog_command(self, cmd):
        if not self.analog_lock:
            self.command(cmd)

    def camera_command(self, prc, params, options):
        if prc == "cam_capimg":
            self.camera.capture_image(params)
        elif prc == "cam_preview":
            self.camera.start_preview()
        elif prc == "cam_stop_preview":
            self.camera.stop_preview()
        elif prc == "cam_set_path":
            self.camera.set_path(params)