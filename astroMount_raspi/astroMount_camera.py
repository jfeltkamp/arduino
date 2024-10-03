#!/usr/bin/env_python3
import time
import os, errno
from picamera2 import Picamera2, Preview

class AstroMountCamera:
    def __init__(self):
        self.picam=Picamera2()
        self.picam.configure(self.picam.create_preview_configuration())
        self.path = None
        self.set_path(path="$HOME/OBELIX/" + time.strftime("%Y_%m_%d-%H:%M"))
        self.picam.start()
        time.sleep(3)


    def __del__(self):
        self.picam.stop()

    def set_path(self, path):
        try:
            if not os.path.exists(path):
                os.makedirs(path, exist_ok=True)
            self.path = path
        except OSError as e:
            if e.errno != errno.EEXIST:
                raise

    def capture_image(self, name):
        self.picam.capture_file(f"{self.path}/{name}.jpg")
        print(f"Captured image {self.path}/{name}.jpg")

    def start_preview(self):
        self.picam.start_preview(Preview.QTGL)

    def stop_preview(self):
        self.picam.stop_preview()
