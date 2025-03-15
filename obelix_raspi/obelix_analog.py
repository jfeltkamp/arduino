#!/usr/bin/env_python3
from obelix_tools import ObelixCommands

"""
    Calculate value from analog input (0-1023) between min and max.
    
    @return (-max_v <= n <= -min_v) OR (min_v <= n <= max_v). 
"""
def get_val_from_analog(analog, min_v, max_v, invert=False):
    analog_int = int(analog)
    val = round(max_v * (analog_int - 511.5) / 511.5)
    if abs(val) < min_v:
        return 0
    if invert:
        return -val
    return val

class ObelixAnalog:

    def __init__(self, obelix):
        self.obelix = obelix
        self.speed_x = 0
        self.speed_y = 0
        self.speed_f = 0

    # Enable Arduino steppers.
    def enable(self):
        enable_cmd = ObelixCommands("ard_enable", "on","-")
        if self.obelix.analog_command(enable_cmd):
            print('Try to enable motor drivers.')
        else:
            print('Waiting queue is ready. Then re-try to enable motor drivers. ')
            self.obelix.command_list_push(enable_cmd)

    # Disable Arduino steppers.
    def disable(self):
        print('Try to disable motor drivers')
        self.obelix.command_list_push(ObelixCommands("ard_enable", "off","-"))

    # Danger stop for all steppers.
    def danger_stop(self):
        self.obelix.clear_list()
        if self.obelix.analog_command(ObelixCommands("ard_stop", "danger","-"), instantly=True):
            return {"message": "Stopped programm an sent danger_stop command."}
        else:
            return {"error": "Failed to send danger_stop command."}

    # Fire command RUN SPEED for axis.
    def set_axis_speed(self, analog_x, analog_y):
        self.speed_x = get_val_from_analog(analog_x, self.obelix.params.va1, self.obelix.params.va2)
        self.speed_y = get_val_from_analog(analog_y, self.obelix.params.va1, self.obelix.params.va2, True)
        self.obelix.analog_command(ObelixCommands("ard_x", f"{self.speed_x}", "-"))
        self.obelix.analog_command(ObelixCommands("ard_y", f"{self.speed_y}", "-"))
        return {
            "vx": self.speed_x,
            "vy": self.speed_y,
        }

    # Set speeds for focus.
    def set_focus_speed(self, analog_f):
        self.speed_f = get_val_from_analog(analog_f, self.obelix.params.vf1, self.obelix.params.vf2)
        self.obelix.analog_command(ObelixCommands("ard_f", f"{self.speed_f}", "-"))
        return {
            "vf": self.speed_f
        }

    # Function for minor analog adjustments.
    def adjust(self, direction, length):
        return {
            "result": self.obelix.command_list_push(ObelixCommands(f"ard_{direction}", f"{length}", "await"))
        }

    # Fire command GOTO for both axis.
    def goto(self, azi, alt):
        return {
            "result": self.obelix.command_list_push(ObelixCommands("ard_goto", f"{azi},{alt}", "await"))
        }