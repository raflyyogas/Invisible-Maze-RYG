import { Maze } from "./maze.js";
import { Player } from "./player.js";

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("mazeCanvas");
  canvas.width = 400;
  canvas.height = 400;

  const rows = 21;
  const cols = 21;
  let maze;
  let player;
  let gameMode = "single"; // Default mode

  const startGameButton = document.getElementById("start-game");
  const resetGameButton = document.getElementById("reset-game");
  const singlePlayerButton = document.getElementById("single-player");
  const doublePlayerButton = document.getElementById("double-player");

  // Event listeners for game mode selection
  singlePlayerButton.addEventListener("click", () => {
    gameMode = "single";
    console.log("Single Player mode selected");
  });

  doublePlayerButton.addEventListener("click", () => {
    gameMode = "double";
    console.log("Double Player mode selected");
  });

  // Start game event
  startGameButton.addEventListener("click", startGame);

  // Reset game event
  resetGameButton.addEventListener("click", resetGame);

  // Function to start the game
  function startGame() {
    const wallHideDuration = 1500;
    const wallReappearDuration = 2500;

    maze = new Maze(rows, cols, canvas, wallHideDuration, wallReappearDuration);
    maze.drawMaze();
    maze.hideWalls();

    player = new Player(maze, 0, 0);
    player.drawPlayer();

    document.addEventListener("keydown", handleKeyDown);

    console.log(`Game started in ${gameMode} mode`);
  }

  // Function to handle player movement
  function handleKeyDown(event) {
    if (!player) return;

    switch (event.key) {
      case "ArrowUp":
        player.move("up");
        break;
      case "ArrowDown":
        player.move("down");
        break;
      case "ArrowLeft":
        player.move("left");
        break;
      case "ArrowRight":
        player.move("right");
        break;
    }
  }

  // Function to reset the game
  function resetGame() {
    if (maze && player) {
      maze = new Maze(rows, cols, canvas);
      maze.drawMaze();
      player.resetPlayer();
      console.log("Game reset");
    }
  }
});
