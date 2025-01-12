#!/usr/bin/env_python3
import traceback
from obelix_tools import ObelixCommands

def get_snail_moves(facet_x_num=3, facet_y_num=3, steps_x=200, steps_y=150, debug=False):
    class Moves:
        def __init__(self, axis, direct, steps, diff_x, diff_y):
            self.axis = axis
            self.direct = direct
            self.steps = steps
            self.diff_x = diff_x
            self.diff_y = diff_y

    # Fires commands.
    try:
        # define static image origin.
        origin_x = round(facet_x_num * steps_x / 2)
        origin_y = round(facet_y_num * steps_y / 2)
        # init relative deviation from origin.
        rel_x = 0
        rel_y = 0
        o_x = origin_x
        o_y = origin_y
        # format
        facet_format = facet_x_num - facet_y_num
        snailMoves = []

        # direction
        direction = 1

        if facet_format > 0:
            start_x = facet_format - 1
            start_y = 0
            rel_x = round(start_x * steps_x / -2)
            o_x = origin_x - rel_x
            snailMoves.append(Moves("x", -1, -rel_x, o_x, o_y))
        elif facet_format < 0:
            start_x = 0
            start_y = -facet_format - 1
            rel_y = round(start_y * steps_y / -2)
            o_y = origin_y - rel_y
            snailMoves.append(Moves("y", -1, -rel_y, o_x, o_y))
        else:
            start_x = 0
            start_y = 0

        while (start_x < facet_x_num) or (start_y < facet_y_num):
            if facet_format >= 0:
                curr_x = 0
                while curr_x <= start_x:
                    curr_x = curr_x + 1
                    move_x = steps_x * direction
                    rel_x = rel_x + move_x
                    o_x = origin_x + rel_x
                    snailMoves.append(Moves("x", direction, steps_x, o_x, o_y))

            curr_y = 0
            while curr_y <= start_y:
                curr_y = curr_y + 1
                move_y = steps_y * direction
                rel_y = rel_y + move_y
                o_y = origin_y + rel_y
                snailMoves.append(Moves("y", direction, steps_y, o_x, o_y))

            if facet_format < 0:
                curr_x = 0
                while curr_x <= start_x:
                    curr_x = curr_x + 1
                    move_x = steps_x * direction
                    rel_x = rel_x + move_x
                    o_x = origin_x + rel_x
                    snailMoves.append(Moves("x", direction, steps_x, o_x, o_y))

            start_x = start_x + 1
            start_y = start_y + 1
            direction = direction * -1

        # Remove last move, to get a clear rectangle.
        del snailMoves[-1]
        rel_x = snailMoves[-1].diff_x
        rel_y = snailMoves[-1].diff_y

        # Return to the origin.
        abs_x = abs(rel_x)
        if abs_x != 0:
            dir_x = round(rel_x / abs_x)
            snailMoves.append(Moves("x", -dir_x, abs_x, 0, rel_y))

        abs_y = abs(rel_y)
        if abs_y != 0:
            dir_y = round(rel_y / abs_y)
            snailMoves.append(Moves("y", -dir_y, abs_y, 0, 0))
        if debug:
            for move in snailMoves:
                print(move.axis, move.direct, move.steps, move.diff_x, move.diff_y)
            return []
        else:
            return snailMoves

    except Exception:
        traceback.print_exc()
        print("Command failed.")


def get_snail_commands(facets_x: int = 3, facets_y: int = 3, repeat=None, debug=False):
    """
    Returns a complete command list for a snail shoot as working stack.

    :param facets_x: number of columns on x-axis.
    :param facets_y: number of rows on y-axis.
    :param repeat: Commands to be executed when mount adjusted new position inside the snail.
    :return: List of ObelixCommands.
    """
    if repeat is None:
        repeat = []
    elif isinstance(repeat, ObelixCommands):
        repeat = [repeat]

    # Check if repeat is list of ObelixCommands.
    if isinstance(repeat, list) & all(isinstance(cmd_item, ObelixCommands) for cmd_item in repeat):
        moves: list = get_snail_moves(facets_x, facets_y)
        commands = []
        for move in moves:
            # Add repeat command before each move.
            commands += repeat
            # Add move command.
            if move.axis == "x":
                if move.direct > 0:
                    commands.append(ObelixCommands("ard_right", str(move.steps), "await"))
                else:
                    commands.append(ObelixCommands("ard_left", str(move.steps), "await"))
            elif move.axis == "y":
                if move.direct > 0:
                    commands.append(ObelixCommands("ard_down", str(move.steps), "await"))
                else:
                    commands.append(ObelixCommands("ard_up", str(move.steps), "await"))
        if debug:
            for command in commands:
                print(command.cmd, command.params, command.options)
            return []
        else:
            return commands

