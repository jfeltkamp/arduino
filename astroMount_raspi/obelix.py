#!/usr/bin/env_python3
import serial
import threading
import time
from obelix_params import *


class Obelix:
    # Serial communication definitions.
    port = '/dev/ttyACM0'
    baudrate = 115200
    timeout = 1.0
    run_listener = False
    params = ObelixParams()

    # INIT: Start serial communication with Arduino and start serial read listener daemon.
    def __init__(self):
        self.cmd_response = ""
        while True:
            try:
                self.ser = serial.Serial(self.port, self.baudrate, timeout=self.timeout)
                time.sleep(3)
                self.ser.reset_input_buffer()
                print("Obelix: Serial connection OK.")
                self.run_listener = True
                threading.Thread(target=self.serial_read_listener(), daemon=True).start()
            except serial.SerialException:
                print("Obelix: Could not connect to serial.")
                time.sleep(1)

    def __del__(self):
        self.ser.close()
        print("Obelix: Serial connection closed.")


    def serial_read_listener(self):
        while self.run_listener:
            time.sleep(0.1)
            if self.ser.in_waiting > 0:
                resp = self.ser.readline().decode('utf-8').rstrip()
                self.params.set_params_from_response(resp)
                if resp.startswith("success") | resp.startswith("error"):
                    self.cmd_response = resp
                else:
                    print(resp)

    def command(self, cmd, param, await_resp=False):
        cmd_serial = f"{cmd}:{param}\n"
        self.ser.write(cmd_serial.encode('utf-8'))
        if await_resp:
            fired_time = time.time()
            while True:
                time.sleep(0.1)
                if self.cmd_response != "":
                    if self.cmd_response.startswith("success"):
                        print(f"Command '{cmd}: {param}' was successful.")
                        self.cmd_response = ""
                        break
                    elif self.cmd_response == "error":
                        raise Exception(f"Error on executing command '{cmd}: {param}'.")
                    else:
                        print(self.cmd_response)
                if time.time() - fired_time > 60:
                    raise Exception(f"Command '{cmd}: {param}' timed out.")
