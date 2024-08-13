class Player {
  constructor(maze, startX, startY) {
    this.maze = maze;
    this.x = startX;
    this.y = startY;
    this.lives = 3; // Player starts with 3 lives
    this.cellSize = this.maze.cellSize;
    this.ctx = this.maze.ctx;
    this.drawPlayer();
  }

  // Method to draw the player on the canvas
  drawPlayer() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      this.x * this.cellSize,
      this.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }

  // Method to clear the previous position of the player
  clearPlayer() {
    this.ctx.clearRect(
      this.x * this.cellSize,
      this.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
    this.maze.drawCell(this.y, this.x, this.maze.mazeGrid[this.y][this.x]);
  }

  // Method to move the player
  move(direction) {
    this.clearPlayer();

    if (direction === "up" && this.canMoveTo(this.x, this.y - 1)) {
      this.y -= 1;
    } else if (direction === "down" && this.canMoveTo(this.x, this.y + 1)) {
      this.y += 1;
    } else if (direction === "left" && this.canMoveTo(this.x - 1, this.y)) {
      this.x -= 1;
    } else if (direction === "right" && this.canMoveTo(this.x + 1, this.y)) {
      this.x += 1;
    } else {
      // If the move is invalid (into a wall), lose a life
      this.loseLife();
    }

    this.drawPlayer();
  }

  // Method to check if the player can move to the given position
  canMoveTo(x, y) {
    // Ensure x and y are within the bounds of the maze grid
    if (x >= 0 && x < this.maze.cols && y >= 0 && y < this.maze.rows) {
      return this.maze.mazeGrid[y][x] === "P"; // Can only move to a path ('P')
    }
    return false;
  }

  // Method to handle losing a life
  loseLife() {
    this.lives -= 1;
    console.log(`Life lost! Lives remaining: ${this.lives}`);

    if (this.lives <= 0) {
      console.log("Game Over");
      alert("Game Over! You have lost all your lives.");
      this.resetPlayer();
    }
  }

  // Reset player to the start position if all lives are lost
  resetPlayer() {
    this.clearPlayer(); // Clear current position
    this.x = 0;
    this.y = 0;
    this.lives = 3; // Reset lives to 3
    this.drawPlayer(); // Draw player at start position
  }
}

// Export Player class to be used in main.js
export { Player };
