#!/usr/bin/env_python3
import serial
import time

while True:
    try:
        ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1.0)
        time.sleep(3)
        ser.reset_input_buffer()
        print("Serial connection OK.")
        break
    except serial.SerialException:
        print("Could not connect to serial.")
        time.sleep(1)


def asterix_command(cmd, param, await_resp=True):
    cmd_serial = f"{cmd}:{param}\n"
    print(cmd_serial)
    ser.write(cmd_serial.encode('utf-8'))
    if await_resp:
        fired_time = time.time()
        while True:
            time.sleep(0.1)
            if ser.in_waiting > 0:
                resp = ser.readline().decode('utf-8').rstrip()
                if resp == "success":
                    print(f"Command '{cmd}: {param}' was successful.")
                    break
                if resp == "error":
                    raise Exception(f"Error on executing command '{cmd}: {param}'.")
                    break
            if time.time() - fired_time > 10:
                raise Exception(f"Command '{cmd}: {param}' timed out.")


commands = {
    "cmd_up": 10000,
    "cmd_left": 10000,
    "cmd_down": 10000,
    "cmd_right": 10000,
}

# Fires commands.
try:
    for command in commands:
        asterix_command(command, commands[command])
    print("Program finished.")
except:
    print("Command failed.")
finally:
    ser.close()
    print("Serial connection closed.")
