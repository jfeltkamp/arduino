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

try:
    while True:
        time.sleep(0.01)
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            if int(line) > 15:
                ser.write("off\n".encode('utf-8'))
                print(line + "°C => Heating off.")
            elif int(line) <= 15:
                ser.write("on\n".encode('utf-8'))
                print(line + "°C => Heating on.")
            else:
                pass
except KeyboardInterrupt:
    print("Closing serial communication.")
    ser.close()