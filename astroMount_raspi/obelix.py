#!/usr/bin/env_python3
import serial
import time

class Obelix:
    # Serial communication definitions.
    port = '/dev/ttyACM0'
    baudrate = 115200
    timeout = 1.0

    def __init__(self):
        while True:
            try:
                print(self.port + " - " + str(self.baudrate) + " - " + str(self.timeout))
                self.serial = serial.Serial(self.port, self.baudrate, timeout=self.timeout)
                time.sleep(3)
                self.serial.reset_input_buffer()
                print("Serial connection OK.")
                break
            except serial.SerialException:
                print("Could not connect to serial.")
                time.sleep(1)

    def __del__(self):
        self.serial.close()
        print("Obelix: Serial connection closed.")


    def command(self, cmd, param, await_resp=False):
        cmd_serial = f"{cmd}:{param}\n"
        self.serial.write(cmd_serial.encode('utf-8'))
        if await_resp:
            fired_time = time.time()
            while True:
                time.sleep(0.1)
                if self.serial.in_waiting > 0:
                    resp = self.serial.readline().decode('utf-8').rstrip()
                    if resp == "success":
                        print(f"Command '{cmd}: {param}' was successful.")
                        break
                    elif resp == "error":
                        raise Exception(f"Error on executing command '{cmd}: {param}'.")
                    else:
                        print(resp)
                if time.time() - fired_time > 20:
                    raise Exception(f"Command '{cmd}: {param}' timed out.")