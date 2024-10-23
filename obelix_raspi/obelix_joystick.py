#!/usr/bin/env_python3
from obelix_tools import ObelixCommands

class ObelixJoystick:
    x: int = 0
    y: int = 0
    f: int = 0
    speed_x: int = 0
    speed_y: int = 0
    speed_f: int = 0
    va1: int = 100
    va2: int = 1500
    vf1: int = 100
    vf2: int = 2000
    do_trigger: bool = False
    do_trigger_x: bool = False
    do_trigger_y: bool = False
    do_trigger_f: bool = False
    cmd_x = "ard_stop"
    cmd_y = "ard_stop"
    cmd_f = "ard_stop"
    param_x = "x"
    param_y = "y"
    param_f = "f"

    def __init__(self, obelix):
        self.obelix = obelix
        self.va2 = obelix.params.va2

    def run_auto_trigger(self):
        self.obelix.analog(ObelixCommands("ard_enable", "on","-"))

    def set_coords(self, x, y):
        self.x = int(x)
        self.speed_x = round(self.va2 * (self.x - 511.5) / 511.5)
        self.do_trigger_x = (abs(self.speed_x) >= self.va1)
        if self.do_trigger_x:
            self.cmd_x = "ard_x"
            self.param_x = f"{self.speed_x}"
        else:
            self.cmd_x = "ard_x"
            self.param_x = "0"
        self.obelix.analog(ObelixCommands(self.cmd_x, self.param_x, "-"))

        self.y = int(y)
        self.speed_y = round(self.va2 * (self.y - 511.5) / 511.5)
        self.do_trigger_y = (abs(self.speed_y) >= self.va1)
        if self.do_trigger_y:
            self.param_y = f"{self.speed_y}"
            self.cmd_y = "ard_y"
        else:
            self.cmd_y = "ard_y"
            self.param_y = "0"
        self.obelix.analog(ObelixCommands(self.cmd_y, self.param_y,"-"))

    def set_focus(self, f):
        self.f = int(f)
        self.speed_f = round(self.vf2 * (self.f - 511.5) / 511.5)
        self.do_trigger_f = (abs(self.speed_f) >= self.vf1)
        if self.do_trigger_f:
            self.cmd_f = "ard_f"
            self.param_f = f"{self.speed_f}"
        else:
            self.cmd_f = "ard_f"
            self.param_f = "0"
        self.obelix.analog(ObelixCommands(self.cmd_f, self.param_f, "-"))
