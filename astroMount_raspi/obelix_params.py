#!/usr/bin/env_python3

class ObelixParams:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.f = 0
        # Speed of axis
        self.va = 800
        # Speed of focus
        self.vf = 500

    def set_params_from_response(self, response):
        print('RESP: ' + response)
        params_raw = response.split("_")
        params_raw.pop(0)
        for param in params_raw:
            param_raw = param.split(":")
            if len(param_raw) >= 2:
                print('param_raw: ' + param_raw[1])
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