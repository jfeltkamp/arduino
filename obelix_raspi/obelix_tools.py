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

    def __init__(self):
        # Positions
        self.x = 0
        self.y = 0
        self.f = 0
        self.deg_x = 0.0
        self.deg_y = 0.0
        # Steppers acceleration.
        self.acc = 1000
        # axis steps per revolution
        self.spr = 80000

        # axis
        self.mpa = 20000 # max position axis (+-)
        self.va = 800
        self.va1 = 100
        self.va2 = 1500
        # direction definitions
        self.dx = 1 # increase steps turns right => positive
        self.dy = -1 # increase steps turns up => negative
        self.df = 1 # increase steps focuses further => positive
        # Speed of focus
        self.mpf = 5000 # max position focus (+-)
        self.vf = 500
        self.vf1 = 100
        self.vf2 = 1500
        self.calc_deg()

    def set_params_from_response(self, response):
        for key in response:
            if key in self.__dict__:
                self.__dict__[key] = response[key]
        self.calc_deg()

    def calc_deg(self):
        self.deg_x = round(360 * self.x / self.spr, 2)
        if (self.deg_x < 0):
            self.deg_x = 360 + self.deg_x
        self.deg_y = round(360 * self.y / self.spr, 2)

    def get_lcd(self, param):
        if param == "x":
            return f"{self.deg_x}:0_0"
        elif param == "y":
            return f"{self.deg_y}:0_1"

    def get_position(self):
        return {
            "x": self.x,
            "y": self.y,
            "f": self.f,
            "deg_x": self.deg_x,
            "deg_y": self.deg_y,
        }
