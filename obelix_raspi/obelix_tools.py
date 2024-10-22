#!/usr/bin/env_python3
import json

class ObelixCommands:
    def __init__(self, cmd, params, options):
        self.cmd = cmd
        self.params = params
        self.options = options

"""
    Decode Payload from Arduino into response object.
    
    Should contain at least these params:
    status <string>: e.g. success / error / ...
    message <string>: Text describing the error or successful command.
    data <object>: Contains the status params forwarded to the central ObelixParams.
"""
class ObelixPayload:
    status = ""
    message = ""
    data = {}
    def __init__(self, payload):
        self.__dict__ = json.loads(payload)

class ObelixParams:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.f = 0
        # axis_steps per rotation
        self.stepsPerRound = 80000

        # Speed of axis
        self.va = 800
        # Speed of focus
        self.vf = 500
        self.axisMaxSpeed = 1500
        self.focusMaxSpeed = 1500
        self.calc_deg()

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
        self.calc_deg()

    def calc_deg(self):
        self.deg_x = round(self.x / self.stepsPerRound, 2)
        self.deg_y = round(self.y / self.stepsPerRound, 2)


    def get_lcd(self, param):
        if param == "x":
            return f"H {self.x}:0_0"
        elif param == "y":
            return f"V {self.y}:0_1"