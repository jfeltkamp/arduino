#!/usr/bin/env_python3
from time import sleep
import serial
import keyboard

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


def asterix_command(cmd, param, await_resp=False):
    cmd_serial = f"{cmd}:{param}\n"
    ser.write(cmd_serial.encode('utf-8'))
    print(cmd_serial)

#declaring it global so that it can be modified from function
global releaseListening
keepListening = True

def key_press(key):
    if key.name == "left":
        asterix_command("cmd_left", "400")
    if key.name == "right":
        asterix_command("cmd_right", "400")
    if key.name == "up":
        asterix_command("cmd_up", "400")
    if key.name == "down":
        asterix_command("cmd_down", "400")

def key_release(key):
    print(f"stop {key.name}")
    if key.name in ["left", "right"]:
        asterix_command("cmd_stop", "x")
    if key.name in ["up", "down"]:
        asterix_command("cmd_stop", "y")

keyboard.on_press(key_press, True)
keyboard.on_release(key_release, True)

while keepListening:
    sleep(1000)