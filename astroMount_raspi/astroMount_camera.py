#!/usr/bin/env_python3
import time
import os, errno
from picamera2 import Picamera2, Preview

class AstroMountCamera:
    path = "/home/admin/OBELIX/"

    def __init__(self):
        self.picam=Picamera2()
        self.still_config = self.picam.create_still_configuration()
        self.prev_config = self.picam.create_preview_configuration()
        self.counter = 0
        self.set_path(self.path + time.strftime("%Y_%m_%d-%H:%M"))
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
        self.picam.stop()
        self.picam.configure(self.still_config)
        self.picam.start(show_preview=False)
        image_name = f"{self.path}/{name}_{self.counter}.jpg"
        self.picam.capture_file(image_name)
        print(f"Captured image {image_name}")
        self.counter += 1


    def start_preview(self):
        self.picam.stop()
        self.picam.configure(self.prev_config)
        self.picam.start_preview(Preview.QTGL)
        self.picam.start()
        time.sleep(1)

    def stop_preview(self):
        try:
            self.picam.stop()
            self.picam.stop_preview()
        except: pass

