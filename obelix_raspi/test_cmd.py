#!/usr/bin/env_python3

from obelix_config import ObelixConfig

file = 'graticule'
conf = ObelixConfig(f"{file}.yml").get('settings')
# conf.update('testval.asd.dfg', 0.04)
# cam = conf.get(['testval'], 'No value')

print(conf, '<--- huhu')