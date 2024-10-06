#!/usr/bin/env_python3
from pynput import keyboard
from astroMount_camera import AstroMountCamera
from obelix import Obelix

picam = AstroMountCamera()
obelix = Obelix()

#declaring it global so that it can be modified from function
global releaseListening
keepListening = True

def key_press(key):
    print(f"RUN {key}")
    if key == keyboard.Key.left:
        obelix.command("cmd_left", "400")
    elif key == keyboard.Key.right:
        obelix.command("cmd_right", "400")
    elif key == keyboard.Key.up:
        obelix.command("cmd_up", "400")
    elif key == keyboard.Key.down:
        obelix.command("cmd_down", "400")
    elif key == keyboard.Key.page_up:
        obelix.command("cmd_focus", "400")
    elif key == keyboard.Key.page_down:
        obelix.command("cmd_focus", "-400")
    elif key in [keyboard.Key.ctrl, keyboard.Key.ctrl_r]:
        picam.start_preview()
    elif key == keyboard.Key.alt_gr:
        picam.stop_preview()
    elif key == keyboard.Key.shift_r:
        picam.capture_image(name="img")
    elif key == keyboard.Key.esc:
        picam.__del__()
        return False # stops listener.

def key_release(key):
    print(f"stop {key}")
    if key in [keyboard.Key.left, keyboard.Key.right]:
        obelix.command("cmd_stop", "x")
    if key in [keyboard.Key.up, keyboard.Key.down]:
        obelix.command("cmd_stop", "y")
    if key in [keyboard.Key.page_up, keyboard.Key.page_down]:
        obelix.command("cmd_stop", "f")

# Collect events until released
with keyboard.Listener(on_press=key_press, on_release=key_release) as listener:
    try:
        listener.join()
    except: pass