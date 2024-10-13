#!/usr/bin/env_python3
import traceback
from obelix import Obelix
from obelix_tools import ObelixCommands

if __name__ == "__main__":

    obelix = Obelix()
    obelix.run_listener()

    commands = []

    commands.append(ObelixCommands("ard_enable", "on", "-"))
    commands.append(ObelixCommands("ard_goto", "3000,3000,-1500,1200,1200", "await"))
    commands.append(ObelixCommands("ard_goto", "0,3000,0,400,0", "await"))
    commands.append(ObelixCommands("ard_goto", "3000,0,1000,1500,1500,800", "await"))
    commands.append(ObelixCommands("ard_goto", "200,200,0", "await"))
    commands.append(ObelixCommands("ard_goto", "0,0,0,150,150,150", "await"))

    """
    moves = get_snail_moves(width=180, height=120, steps_x=60, steps_y=40, debug=False)
    
    for move in moves:
        if move.axis == "x":
            if move.direct > 0:
                commands.append(ObelixCommands("ard_right", str(move.steps), "await"))
            else:
                commands.append(ObelixCommands("ard_left", str(move.steps), "await"))
        else:
            if move.direct > 0:
                commands.append(ObelixCommands("ard_down", str(move.steps), "await"))
            else:
                commands.append(ObelixCommands("ard_up", str(move.steps), "await"))
        commands.append(ObelixCommands("cam_capimg", f"img_{move.diff_x}_{move.diff_y}", ""))
    """

    commands.append(ObelixCommands("ard_enable", "off", "-"))

    # Fires commands.
    try:
        obelix.command_list_push(commands)

        print("Program finished.")
    except Exception:
        traceback.print_exc()
        print("Command failed.")
    finally:
        print("Program closed.")
