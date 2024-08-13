# game.py
import time
import curses
from maze import Maze
from player import Player
from utils import calculate_score, read_high_score, write_high_score

class Game:
    def __init__(self, size):
        self.maze = Maze(size)
        self.player = Player(self.maze.start)
        self.start_time = time.time()
        self.time_limit = 10  # Seconds to memorize the maze
        self.high_score_file = f'high_score_{size}x{size}.txt'
        self.high_score = read_high_score(self.high_score_file)

    def start(self):
        print("Memorize the maze:")
        self.maze.display_maze(None, self.player.position)
        time.sleep(self.time_limit)
        self.maze.hide_lines()
        self.game_loop()

    def game_loop(self):
        curses.wrapper(self._game_loop)

    def _game_loop(self, stdscr):
        curses.curs_set(0)
        stdscr.nodelay(1)
        stdscr.timeout(100)

        while self.player.check_health() and self.player.position != self.maze.end:
            stdscr.clear()
            self.display_status(stdscr)
            self.maze.display_maze(stdscr, self.player.position, show_lines=False)
            key = stdscr.getch()
            if key == curses.KEY_UP:
                self.player.move('up')
            elif key == curses.KEY_DOWN:
                self.player.move('down')
            elif key == curses.KEY_LEFT:
                self.player.move('left')
            elif key == curses.KEY_RIGHT:
                self.player.move('right')
            if self.maze.check_collision(*self.player.position):
                self.player.hit()
                stdscr.addstr(self.maze.size + 1, 0, f"You hit a wall! Remaining health: {self.player.health}")
            stdscr.refresh()

        self.end_game()

    def display_status(self, stdscr):
        elapsed_time = time.time() - self.start_time
        stdscr.addstr(0, 0, f"Health: {self.player.health}")
        stdscr.addstr(1, 0, f"Time: {elapsed_time:.2f} seconds")
        stdscr.addstr(2, 0, f"High Score: {self.high_score:.2f} seconds")

    def end_game(self):
        score = calculate_score(self.start_time)
        print(f"Congratulations! You've reached the end. Your score: {score:.2f} seconds") if self.player.position == self.maze.end else print("Game over! You've lost all your health.")
        if self.player.position == self.maze.end and score < self.high_score:
            print("New high score!")
            write_high_score(self.high_score_file, score)
        self.restart_option()

    def restart_option(self):
        choice = input("Do you want to restart the game? (yes/no): ").strip().lower()
        if choice == 'yes':
            self.__init__(self.maze.size)
            self.start()
