#!/usr/bin/env_python3
import traceback

def get_snail_moves(width = 3200, height = 1800, steps_x = 200, steps_y = 150, debug = False):

    class Moves:
        def __init__(self, axis, direct, steps, diff_x, diff_y):
            self.axis = axis
            self.direct = direct
            self.steps = steps
            self.diff_x = diff_x
            self.diff_y = diff_y

    # Fires commands.
    try:
        # init relative deviation from origin.
        rel_x = 0
        rel_y = 0
        # Calc number of facets in each direction
        facet_x_num = round(width / steps_x)
        facet_y_num = round(height / steps_y)
        # format
        facet_format = facet_x_num - facet_y_num
        snailMoves = []

        # direction
        direction = 1

        if facet_format > 0:
            start_x = facet_format - 1
            start_y = 0
            rel_x = round(start_x * steps_x / -2)
            snailMoves.append(Moves("x", -1, -rel_x, rel_x, rel_y))
        elif facet_format < 0:
            start_x = 0
            start_y = -facet_format - 1
            rel_y = round(start_y * steps_y / -2)
            snailMoves.append(Moves("y", -1, -rel_y, rel_x, rel_y))
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
                    snailMoves.append(Moves("x", direction, steps_x, rel_x, rel_y))

            curr_y = 0
            while curr_y <= start_y:
                curr_y = curr_y + 1
                move_y = steps_y * direction
                rel_y = rel_y + move_y
                snailMoves.append(Moves("y", direction, steps_x, rel_x, rel_y))


            if facet_format < 0:
                curr_x = 0
                while curr_x <= start_x:
                    curr_x = curr_x + 1
                    move_x = steps_x * direction
                    rel_x = rel_x + move_x
                    snailMoves.append(Moves("x", direction, steps_x, rel_x, rel_y))

            start_x = start_x + 1
            start_y = start_y + 1
            direction = direction * -1

        # Remove last move, to get a clear rectangle.
        del snailMoves[-1]
        rel_x = snailMoves[-1].diff_x
        rel_y = snailMoves[-1].diff_y

        # Return to the origin.
        abs_x = abs(rel_x)
        dir_x = round(rel_x / abs_x)
        snailMoves.append(Moves("x", -dir_x, abs_x, 0, rel_y))

        abs_y = abs(rel_y)
        dir_y = round(rel_y / abs_y)
        snailMoves.append(Moves("y", -dir_y, abs_y, 0, 0))
        if debug:
            for move in snailMoves:
                print(move.axis, move.direct, move.steps, move.diff_x, move.diff_y)
        return snailMoves

    except Exception:
        traceback.print_exc()
        print("Command failed.")
