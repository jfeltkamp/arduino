#!/usr/bin/env_python3

class ObelixCommands:
    def __init__(self, cmd, params, options):
        self.cmd = cmd
        self.params = params
        self.options = options



class ObelixParams:

    def __init__(self):
        self.x = 0
        self.y = 0
        self.f = 0
        # Speed of axis
        self.va = 800
        # Speed of focus
        self.vf = 500
        self.axisMaxSpeed = 1500
        self.focusMaxSpeed = 1500

    def set_params_from_response(self, response):
        params_raw = response.split("_")
        params_raw.pop(0)
        for param in params_raw:
            param_raw = param.split(":")
            if len(param_raw) >= 2:
                if param_raw[0] == "x":
                    self.x = int(param_raw[1])
                elif param_raw[0] == "y":
                    self.y = int(param_raw[1])
                elif param_raw[0] == "f":
                    self.f = int(param_raw[1])
                elif param_raw[0] == "va":
                    self.va = int(param_raw[1])
                elif param_raw[0] == "vf":
                    self.vf = int(param_raw[1])

    def get_lcd(self, param):
        if param == "x":
            return f"H {self.x}:0_0"
        elif param == "y":
            return f"V {self.y}:0_1"