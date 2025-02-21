from cs50 import get_int


def print_spaces(num_spaces):
    for i in range(num_spaces):
        # prints the spaces before the left wall and between the walls
        print(" ", end="")


def print_wall(num_bricks):
    for i in range(num_bricks + 1):
        # prints the wall with given number of bricks
        print("#", end="")


# get height of wall
while True:
    height = get_int("Height: ")
    if height >= 1 and height <= 8:
        break
# iterate over provided height
for i in range(height):
    leading_spaces = height - i - 1
    # iterate over number of walls to print
    for j in range(2):
        if j == 0:
            # Print left wall
            print_spaces(leading_spaces)
            print_wall(i)
        else:
            # Print right wall
            print_spaces(2)
            print_wall(i)
    print('')
