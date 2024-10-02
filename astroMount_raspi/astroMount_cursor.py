#!/usr/bin/env_python3
from time import sleep
import serial
from pynput import keyboard

while True:
    try:
        ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1.0)
        sleep(3)
        ser.reset_input_buffer()
        print("Serial connection OK.")
        break
    except serial.SerialException:
        print("Could not connect to serial.")
        sleep(1)

class MyException(Exception): pass

def asterix_command(cmd, param, await_resp=False):
    cmd_serial = f"{cmd}:{param}\n"
    ser.write(cmd_serial.encode('utf-8'))
    print(cmd_serial)

#declaring it global so that it can be modified from function
global releaseListening
keepListening = True

def key_press(key):
    print(f"RUN {key}")
    if key == keyboard.Key.left:
        asterix_command("cmd_left", "400")
    if key == keyboard.Key.right:
        asterix_command("cmd_right", "400")
    if key == keyboard.Key.up:
        asterix_command("cmd_up", "400")
    if key == keyboard.Key.down:
        asterix_command("cmd_down", "400")
    if key == keyboard.Key.esc:
        raise MyException(key)

def key_release(key):
    print(f"stop {key}")
    if key in [keyboard.Key.left, keyboard.Key.right]:
        asterix_command("cmd_stop", "x")
    if key in [keyboard.Key.up, keyboard.Key.down]:
        asterix_command("cmd_stop", "y")

# Collect events until released
with keyboard.Listener(on_press=key_press, on_release=key_release) as listener:
    try:
        listener.join()
    except MyException as e:
        print('{0} was pressed'.format(e.args[0]))