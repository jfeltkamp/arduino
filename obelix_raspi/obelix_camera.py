#!/usr/bin/env_python3
import time
import os, errno, math
from picamera2 import Picamera2
from picamera2.encoders import H264Encoder

from obelix_raspi.obelix_tools import ObelixCommands
from obelix_stream import ObelixStream
from obelix_snail_shot import get_snail_commands

class ObelixCamera:
    base_path = ""
    path = ""
    vid_name = ""
    vid_encoder = H264Encoder()
    img_counter = 0
    vid_counter = 0

    def __init__(self, obelix, base_path="/home/admin/OBELIX/"):
        self.obelix = obelix
        self.base_path = base_path
        self.picam_a = Picamera2(0)
        self.picam_b = Picamera2(1)
        self.stream = ObelixStream(self.picam_a, self.picam_b)
        self.still_config = self.picam_a.create_still_configuration()
        self.prev_config = self.picam_a.create_preview_configuration()
        time.sleep(1)
        self.started = False


    def __del__(self):
        self.picam_a.stop()
        self.picam_b.stop()

    def set_path(self):
        if self.path == "":
            try:
                path = self.base_path + time.strftime("%Y_%m_%d-%H:%M")
                if not os.path.exists(path):
                    os.makedirs(path, exist_ok=True)
                self.path = path
            except OSError as e:
                if e.errno != errno.EEXIST:
                    raise

    def start_stream(self):
        self.stream.start()

    def set_control(self, param, value):
        control = self.cast_controls({param: value})
        self.picam_a.set_controls(control)
        self.picam_b.set_controls(control)
        time.sleep(0.5)
        return self.picam_a.capture_metadata()

    def set_controls(self, values):
        controls = self.cast_controls(values)
        self.picam_a.set_controls(controls)
        self.picam_b.set_controls(controls)
        time.sleep(0.5)
        return self.picam_a.capture_metadata()

    def capture_image(self, name:str='image', cam:str='cam_a'):
        self.set_path()
        image_name = f"{self.path}/{name}_{self.img_counter}.jpg"
        if cam == 'cam_b':
            self.picam_b.capture_file(image_name)
        else:
            self.picam_a.capture_file(image_name)
        self.img_counter += 1
        print(f"Captured image {image_name}")
        return {"image": image_name }

    def snail_shot(self, rows, cols, cam):
        repeat = ObelixCommands('cam_capimg', f"snail{rows}x{cols}", cam)
        cmd_list = get_snail_commands(rows, cols, repeat)
        self.obelix.command_list_push(cmd_list)

    def video_rec_start(self, name):
        self.set_path()
        self.vid_name = f"{self.path}/{name}_{self.vid_counter}.h264"
        self.picam_a.start_encoder(self.vid_encoder, self.vid_name)
        self.vid_counter += 1
        print(f"Started capture video {self.vid_name}")
        return {"video": self.vid_name }

    def video_rec_stop(self):
        self.picam_a.stop_encoder(self.vid_encoder)
        data = {"video": self.vid_name }
        self.vid_name = ""
        return data

    def start_preview(self):
        self.picam_a.stop()
        self.picam_a.configure(self.prev_config)
        self.picam_a.start()
        time.sleep(2)
        self.picam_a.stop_preview()
        self.picam_a.start_preview(True)
        time.sleep(2)

    def stop_preview(self):
        try:
            self.picam_a.stop_preview()
            self.picam_a.stop()
        except:
            pass

    # To avoid errors all params are cast to correct data type.
    def cast_controls(self, object):
        casted = {}
        for key, value in object.items():
            if key == 'ExposureTime':
                exp_setting = float(value)
                exp_time = round(math.pow(0.63095734, -exp_setting) * 33000)
                if exp_time > 33000:
                    frame_dur = exp_time
                else:
                    frame_dur = 33000
                casted['ExposureTime'] = exp_time
                casted['FrameDurationLimits'] = (frame_dur, frame_dur)
            elif key in ('AfMode', 'AeConstraintMode', 'AeExposureMode', 'AeFlickerMode', 'AeFlickerPeriod', 'AeMeteringMode', 'AfRange', 'AfSpeed', 'AwbMode'):
                casted[key] = int(value)
            elif key in ('Brightness', 'Contrast', 'Saturation', 'Sharpness', 'ExposureValue', 'LensPosition', 'AnalogueGain'):
                casted[key] = float(value)
            else:
                # enum(AeEnable, AwbEnable, ScalerCrop)
                casted[key] = value
        return casted