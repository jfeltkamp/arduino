#!/usr/bin/env_python3
from time import sleep
import serial
from pynput import keyboard
from astroMount_camera import AstroMountCamera

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
picam=AstroMountCamera()

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
    elif key == keyboard.Key.right:
        asterix_command("cmd_right", "400")
    elif key == keyboard.Key.up:
        asterix_command("cmd_up", "400")
    elif key == keyboard.Key.down:
        asterix_command("cmd_down", "400")
    elif key == keyboard.Key.page_up:
        asterix_command("cmd_focus", "400")
    elif key == keyboard.Key.page_down:
        asterix_command("cmd_focus", "-400")
    elif key in [keyboard.Key.ctrl, keyboard.Key.ctrl_r]:
        picam.start_preview()
    elif key == keyboard.Key.alt_gr:
        picam.stop_preview()
    elif key == keyboard.Key.shift_r:
        picam.capture_image(name="img")
    elif key == keyboard.Key.esc:
        picam.__del__()
        raise MyException(key)

def key_release(key):
    print(f"stop {key}")
    if key in [keyboard.Key.left, keyboard.Key.right]:
        asterix_command("cmd_stop", "x")
    if key in [keyboard.Key.up, keyboard.Key.down]:
        asterix_command("cmd_stop", "y")
    if key in [keyboard.Key.page_up, keyboard.Key.page_down]:
        asterix_command("cmd_stop", "f")

# Collect events until released
with keyboard.Listener(on_press=key_press, on_release=key_release) as listener:
    try:
        listener.join()
    except MyException as e:
        print('{0} was pressed'.format(e.args[0]))