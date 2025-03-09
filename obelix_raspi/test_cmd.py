#!/usr/bin/env_python3
from subprocess import Popen, PIPE
# from obelix_config import ObelixConfig

# file = 'graticule'
# conf = ObelixConfig(f"{file}.yml").get('settings', {})
# conf.update('testval.asd.dfg', 0.04)
# cam = conf.get(['testval'], 'No value')

p = Popen(['ls', '-la'], stdin=PIPE, stdout=PIPE, stderr=PIPE)
output, err = p.communicate(b"input data that is passed to subprocess' stdin")
rc = p.returncode

print(output)