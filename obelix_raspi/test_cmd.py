#!/usr/bin/env_python3

from obelix_config import ObelixConfig

conf = ObelixConfig('graticule.yml')
conf.update('testval.asd.dfg', 0.04)
cam = conf.get(['testval'], 'No value')

print(cam, '<--- huhu')