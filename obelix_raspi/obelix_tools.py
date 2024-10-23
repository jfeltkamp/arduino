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
    data = {}
    def __init__(self, payload):
        self.__dict__ = json.loads(payload)

class ObelixParams:
    # Positions
    x = 0
    y = 0
    f = 0
    # Steppers acceleration.
    acc = 1000
    # axis steps per revolution
    spr = 80000

    # axis
    mpa = 20000 # max position axis (+-)
    va = 800
    va1 = 100
    va2 = 1500
    # Speed of focus
    mpf = 5000 # max position focus (+-)
    vf = 500
    vf1 = 100
    vf2 = 1500

    def __init__(self):
        self.calc_deg()

    def set_params_from_response(self, response):
        if 'x' in response:
            self.x = response["x"]
        if 'y' in response:
            self.x = response["y"]
        if 'f' in response:
            self.f = response["f"]
        if 'acc' in response:
            self.acc = response["acc"]
        if 'spr' in response:
            self.spr = response["spr"]

        if 'mpa' in response:
            self.mpa = response["mpa"]
        if 'va' in response:
            self.va = response["va"]
        if 'va1' in response:
            self.va1 = response["va1"]
        if 'va2' in response:
            self.va2 = response["va2"]

        if 'mpf' in response:
            self.mpf = response["mpf"]
        if 'vf' in response:
            self.vf = response["vf"]
        if 'vf1' in response:
            self.vf1 = response["vf1"]
        if 'vf2' in response:
            self.vf2 = response["vf2"]
        self.calc_deg()

    def calc_deg(self):
        self.deg_x = round(self.x / self.spr, 2)
        self.deg_y = round(self.y / self.spr, 2)


    def get_lcd(self, param):
        if param == "x":
            return f"{self.deg_x}:0_0"
        elif param == "y":
            return f"{self.deg_y}:0_1"