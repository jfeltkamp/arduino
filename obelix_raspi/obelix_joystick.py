#!/usr/bin/env_python3
from obelix_tools import ObelixCommands

class ObelixJoystick:
    x: int = 0
    y: int = 0
    speed_x: int = 0
    speed_y: int = 0
    axisMinSpeed: int = 100
    axisMaxSpeed: int = 1500
    do_trigger: bool = False
    do_trigger_x: bool = False
    do_trigger_y: bool = False
    cmd_x = "ard_stop"
    cmd_y = "ard_stop"
    param_x = "x"
    param_y = "y"

    def __init__(self, obelix):
        self.obelix = obelix
        self.axisMaxSpeed = obelix.params.axisMaxSpeed

    def run_auto_trigger(self):
        self.obelix.analog(ObelixCommands("ard_enable", "on","-"))

    def set_coords(self, x, y):
        self.x = int(x)
        self.speed_x = round(self.axisMaxSpeed * (self.x - 511.5) / 511.5)
        self.do_trigger_x = (abs(self.speed_x) >= self.axisMinSpeed)
        if self.do_trigger_x:
            self.cmd_x = "ard_x"
            self.param_x = f"{self.speed_x}"
        else:
            self.cmd_x = "ard_x"
            self.param_x = "0"
        self.obelix.analog(ObelixCommands(self.cmd_x, self.param_x, "-"))

        self.y = int(y)
        self.speed_y = round(self.axisMaxSpeed * (self.y - 511.5) / 511.5)
        self.do_trigger_y = (abs(self.speed_y) >= self.axisMinSpeed)
        if self.do_trigger_y:
            self.param_y = f"{self.speed_y}"
            self.cmd_y = "ard_y"
        else:
            self.cmd_y = "ard_y"
            self.param_y = "0"
        self.obelix.analog(ObelixCommands(self.cmd_y, self.param_y,"-"))
