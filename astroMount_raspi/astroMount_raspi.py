#!/usr/bin/env_python3
import traceback
from astroMount_facet_img import get_snail_moves
from astroMount_camera import AstroMountCamera
from obelix import Obelix


# Focussing image with camera
# repeatedly asking for value & fire command.
def prc_focus(params):
    if params == "manual":
        print("FOCUS:")
        print("neg number => nearer")
        print("pos number => further")
        print("X => exit + continue")
        while True:
            value = input("Enter focussing value: ")
            if value.upper() == "X":
                break
            else:
                try:
                    num = int(value)
                    if -2000 <= num <= 2000:
                        obelix.command("cmd_focus", value)
                    else:
                        print("Invalid focussing value. Try value between -2000 and 2000.")
                except:
                    print(f"'{value}' is not a valid number. Enter e.g.: '-200'")
        print("Focussing finished.")

def prc_capimg(params):
    picam.capture_image(params)

def run_process(prc, params, await_resp=True):
    if prc == "prc_focus":
        prc_focus(params)
    elif prc == "prc_capimg":
        prc_capimg(params)


# Comands pain.
# "cmd_xxx" => "<params>:<options>" -> Comands with params directly posted to arduino.
# "prc_xxx" => "<params>:<options>" -> Process of inputs and commands controlled from raspi function.

class Commands:
    def __init__(self, cmd, params, options):
        self.cmd = cmd
        self.params = params
        self.options = options


if __name__ == "__main__":

    picam = AstroMountCamera()
    obelix = Obelix()
    obelix.run_listener()

    commands = []
    
    commands.append(Commands("cmd_goto", "3000,3000,-1500,1200,1200", "await"))
    commands.append(Commands("cmd_goto", "0,3000,0,400,0", "await"))
    commands.append(Commands("cmd_goto", "3000,0,1000,1500,1500,800", "await"))
    commands.append(Commands("cmd_goto", "200,200,0", "await"))
    commands.append(Commands("cmd_goto", "0,0,0,150,150,150", "await"))
    """
    moves = get_snail_moves(width=180, height=120, steps_x=60, steps_y=40, debug=False)
    
    for move in moves:
        if move.axis == "x":
            if move.direct > 0:
                commands.append(Commands("cmd_right", str(move.steps), "await"))
            else:
                commands.append(Commands("cmd_left", str(move.steps), "await"))
        else:
            if move.direct > 0:
                commands.append(Commands("cmd_down", str(move.steps), "await"))
            else:
                commands.append(Commands("cmd_up", str(move.steps), "await"))
        commands.append(Commands("prc_capimg", f"img_{move.diff_x}_{move.diff_y}", ""))
    """



    # Fires commands.
    try:
        for command in commands:
            if command.cmd.startswith("cmd_"):
                obelix.command(command.cmd, command.params + ':' + command.options, (command.options.find('await') != -1))
            elif command.cmd.startswith("prc_"):
                run_process(command.cmd, command.params)

        print("Program finished.")
    except Exception:
        traceback.print_exc()
        print("Command failed.")
    finally:
        print("Program closed.")
