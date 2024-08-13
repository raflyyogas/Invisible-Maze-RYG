# maze.py
import random
import player as player

class Maze:
    def __init__(self, size):
        self.size = size
        self.grid = [[' ' for _ in range(size)] for _ in range(size)]
        self.start = (0, 0)
        self.end = (size-1, size-1)
        self.lines = []
        self.generate_maze()

    def generate_maze(self):
        for _ in range(random.randint(self.size, self.size * 2)):
            x1, y1, x2, y2 = random.sample(range(self.size), 4)
            self.lines.append(((x1, y1), (x2, y2)))
            if x1 == x2:  # Vertical line
                for y in range(min(y1, y2), max(y1, y2) + 1):
                    self.grid[y][x1] = '|'
            elif y1 == y2:  # Horizontal line
                for x in range(min(x1, x2), max(x1, x2) + 1):
                    self.grid[y1][x] = '-'

    def display_maze(self, stdscr, player_position, show_lines=True):
        for y in range(self.size):
            for x in range(self.size):
                if (x, y) == self.start:
                    stdscr.addstr(y, x * 2, 'S')
                elif (x, y) == self.end:
                    stdscr.addstr(y, x * 2, 'E')
                elif (x, y) == player_position:
                    stdscr.addstr(y, x * 2, 'P')
                elif show_lines and self.grid[y][x] in '|-':
                    stdscr.addstr(y, x * 2, self.grid[y][x])
                else:
                    stdscr.addstr(y, x * 2, '.')
