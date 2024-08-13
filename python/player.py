# player.py
class Player:
    def __init__(self, start_pos):
        self.position = start_pos
        self.health = 3

    def move(self, direction):
        x, y = self.position
        if direction == 'up':
            y -= 1
        elif direction == 'down':
            y += 1
        elif direction == 'left':
            x -= 1
        elif direction == 'right':
            x += 1
        self.position = (x, y)

    def check_health(self):
        return self.health > 0

    def hit(self):
        self.health -= 1
