#!/usr/bin/env_python3
import sys
import time
import traceback


# Fires commands.
try:
    # Image size
    width = 3200
    height = 1800
    # single facet size
    steps_x = 200
    steps_y = 150
    # Calc number of facets in each direction
    facet_x_num = round(width / steps_x)
    facet_y_num = round(height / steps_y)
    # format
    facet_format = facet_x_num - facet_y_num

    if facet_format > 0:
        format = "landscape"
        start_x = facet_format - 1
        start_y = 0
    elif facet_format < 0:
        format = "portrait"
        start_x = 0
        start_y = -facet_format - 1
    else:
        format = "square"
        start_x = 0
        start_y = 0
    # direction
    dir_x = 1
    dir_y = 1

    curr_x = 0
    while (curr_x < start_x) :
        curr_x = curr_x + 1
        move_x = curr_x * steps_x * dir_x
        print("X ", move_x)
    dir_x = dir_x * -1


    print(format, facet_x_num, facet_y_num, start_x, start_y)



except Exception:
    traceback.print_exc()
    print("Command failed.")
finally:
    print("programm finished and closed.")