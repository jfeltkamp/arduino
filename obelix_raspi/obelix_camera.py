#!/usr/bin/env_python3
import time
import os, errno, cv2
from picamera2 import Picamera2

class ObelixCamera:
    base_path = ""
    path = ""
    counter = 0

    def __init__(self, base_path="/home/admin/OBELIX/"):
        self.base_path = base_path
        self.picam=Picamera2()
        self.still_config = self.picam.create_still_configuration()
        self.prev_config = self.picam.create_preview_configuration()
        self.stream_config = self.picam.create_preview_configuration(main={"format": 'XRGB8888', "size": (640,480)})
        time.sleep(1)
        self.started = False


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

    def start_stream(self):
        if self.started:
            pass
        else:
            self.started = True
            self.picam.configure(self.stream_config)
            self.picam.start()
            time.sleep(1)

    # Delivers camera streaming content.
    def generate_frames(self):
        while True:
            frame = self.picam.capture_array()
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    def capture_image(self, name):
        if self.path == "":
            self.set_path(self.base_path + time.strftime("%Y_%m_%d-%H:%M"))
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
        self.picam.start()
        time.sleep(2)
        self.picam.stop_preview()
        self.picam.start_preview(True)
        time.sleep(2)

    def stop_preview(self):
        try:
            self.picam.stop_preview()
            self.picam.stop()
        except: pass

