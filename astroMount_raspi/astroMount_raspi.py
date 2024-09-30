#!/usr/bin/env_python3
import serial
import time
import traceback
from astroMount_facet_img import get_snail_moves

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


def asterix_command(cmd, param, await_resp=False):
    cmd_serial = f"{cmd}:{param}\n"
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
                elif resp == "error":
                    raise Exception(f"Error on executing command '{cmd}: {param}'.")
                else:
                    print(resp)
            if time.time() - fired_time > 20:
                raise Exception(f"Command '{cmd}: {param}' timed out.")


# Focussing image with camera
# repeatedly asking for value & fire command.
def prc_focus(params):
    if params == "manual":
        print("FOCUS:")
        print("neg number => nearer")
        print("pos number => further")
        print("X => exit + continue")
        while True:
            value = input("Enter focussing value: ")
            if value.upper() == "X":
                break
            else:
                try:
                    num = int(value)
                    if -2000 <= num <= 2000:
                        asterix_command("cmd_focus", value)
                    else:
                        print("Invalid focussing value. Try value between -2000 and 2000.")
                except:
                    print(f"'{value}' is not a valid number. Enter e.g.: '-200'")
        print("Focussing finished.")


def run_process(prc, params, await_resp=True):
    if prc == "prc_focus":
        prc_focus(params)


# Comands pain.
# "cmd_xxx" => "<params>:<options>" -> Comands with params directly posted to arduino.
# "prc_xxx" => "<params>:<options>" -> Process of inputs and commands controlled from raspi function.

class Commands:
    def __init__(self, cmd, params, options):
        self.cmd = cmd
        self.params = params
        self.options = options

commands = []

moves = get_snail_moves()
for move in moves:
    if move.axis == "x":
        if move.direct > 0:
            commands.append(Commands("cmd_right", str(move.steps), "await"))
        else:
            commands.append(Commands("cmd_left", str(move.steps), "await"))
        commands.append(Commands("cmd_lcd", "H " + str(move.diff_x), "0_0_await"))
    else:
        if move.direct > 0:
            commands.append(Commands("cmd_down", str(move.steps), "await"))
        else:
            commands.append(Commands("cmd_up", str(move.steps), "await"))
        commands.append(Commands("cmd_lcd", "V " + str(move.diff_y), "0_1_await"))

# Fires commands.
try:
    for command in commands:
        if command.cmd.startswith("cmd_"):
            asterix_command(command.cmd, command.params + ':' + command.options, (command.options.find('await') != -1))
        elif command.cmd.startswith("prc_"):
            run_process(command.cmd, command.params)

    print("Program finished.")
except Exception:
    traceback.print_exc()
    print("Command failed.")
finally:
    ser.close()
    print("Serial connection closed.")
