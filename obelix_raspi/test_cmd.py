#!/usr/bin/env_python3

from obelix_tools import *

conf = ObelixConfig()
cam = conf.get(['camera', 'cam_b', 'step_height'], 928374)

print(cam, '<--- huhu')