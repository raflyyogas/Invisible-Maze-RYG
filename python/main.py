# main.py
from game import Game
import random

if __name__ == "__main__":
    size = random.choice([4, 6, 12])  # Random maze size
    game = Game(size)
    game.start()
