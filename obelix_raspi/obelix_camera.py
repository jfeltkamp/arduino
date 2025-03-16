#!/usr/bin/env_python3
import os, errno, math, yaml, datetime, time
from picamera2 import Picamera2
from picamera2.encoders import H264Encoder
from libcamera import Transform

from obelix_tools import ObelixCommands
from obelix_stream import ObelixStream
from obelix_snail_shot import get_snail_commands


def remove_prefix(text, prefix):
    if text.startswith(prefix):
        return text[len(prefix):]
    return text

class ObelixCamera:
    base_path = ""
    path = ""
    vid_name = ""
    vid_encoder = H264Encoder()
    img_counter = 0
    vid_counter = 0

    def __init__(self, obelix, base_path):
        self.obelix = obelix
        self.base_path = os.path.abspath(base_path)
        self.picam_a = Picamera2(1)
        self.picam_b = Picamera2(0)
        self.stream = ObelixStream(self.picam_a, self.picam_b)
        self.still_config = self.picam_a.create_still_configuration(transform=Transform(hflip=True, vflip=True))
        self.prev_config = self.picam_a.create_preview_configuration(transform=Transform(hflip=True, vflip=True))
        time.sleep(1)
        self.started = False


    def __del__(self):
        self.picam_a.stop()
        self.picam_b.stop()

    def set_path(self):
        if self.path == "":
            try:
                path = os.path.join(self.base_path, time.strftime("%Y_%m_%d_%H%M"))
                if not os.path.exists(path):
                    os.makedirs(path, exist_ok=True)
                self.path = path
            except OSError as e:
                if e.errno != errno.EEXIST:
                    raise

    def start_stream(self):
        self.stream.start()

    """
        Write new image with position data to YAML file in image folder. 
    """
    def write_index(self, path, image_path, camera):
        position = self.obelix.params.get_position()
        location = self.obelix.navigation.location
        try:
            yaml_path = os.path.join(path, "index.yml")
            if os.path.exists(yaml_path):
                with open(yaml_path) as stream:
                    data = yaml.safe_load(stream)
                    stream.close()
                    if not "images" in data:
                        data["images"] = []
            else:
                data = {
                    "location": location.get("geo", {'addr': 'No address'}),
                    "images": []
                }
            data["images"].append({
                "path": os.path.join('/gallery{0}'.format(remove_prefix(image_path, self.base_path))),
                "datetime": datetime.datetime.now().isoformat(),
                "camera": camera,
                "position": position,
            })
            with open(yaml_path, 'w') as stream:
                yaml.dump(data, stream)
                stream.close()
        except OSError as e:
            if e.errno != errno.EEXIST:
                raise

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

    def capture_image(self, name: str='image', cam: str='cam_a'):
        self.set_path()
        image_name = f"{self.path}/{name}_{self.img_counter}.jpg"
        if cam == 'cam_b':
            self.picam_b.capture_file(image_name)
        else:
            self.picam_a.capture_file(image_name)
        self.img_counter += 1
        print(f"Captured image {image_name}")
        self.write_index(self.path, image_name, cam)
        return {"image": image_name }

    def snail_shot(self, cols, rows, cam):
        repeat = ObelixCommands('cam_capimg', f"snail{rows}x{cols}", cam)
        width = self.obelix.config.get(['camera', cam, 'step_width'])
        height = self.obelix.config.get(['camera', cam, 'step_height'])
        cmd_list = get_snail_commands(cols, rows, width, height, repeat)
        self.obelix.command_list_push(cmd_list)

    def video_rec_start(self, name):
        self.set_path()
        self.vid_name = f"{self.path}/{name}_{self.vid_counter}.h264"
        self.picam_a.start_encoder(self.vid_encoder, self.vid_name)
        self.vid_counter += 1
        self.write_index(self.path, self.vid_name, 'Cam A')
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