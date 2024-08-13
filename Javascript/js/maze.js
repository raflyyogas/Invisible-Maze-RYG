class Maze {
  constructor(
    rows,
    cols,
    canvas,
    wallHideDuration = 2000,
    wallReappearDuration = 3000
  ) {
    this.rows = rows;
    this.cols = cols;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.cellSize = canvas.width / this.cols;
    this.wallHideDuration = wallHideDuration; // Durasi dinding menghilang
    this.wallReappearDuration = wallReappearDuration; // Durasi dinding muncul kembali
    this.mazeGrid = this.generateMazeGrid();
  }

  // Metode untuk menghasilkan grid maze dengan dinding
  generateMazeGrid() {
    let grid = [];
    for (let row = 0; row < this.rows; row++) {
      let rowArray = [];
      for (let col = 0; col < this.cols; col++) {
        rowArray.push("W"); // Inisialisasi semua sel sebagai dinding ('W')
      }
      grid.push(rowArray);
    }

    // Panggil metode untuk membuat jalur di maze
    this.carvePath(grid);
    return grid;
  }

  // Membuat jalur di dalam maze menggunakan algoritma backtracking rekursif
  carvePath(grid) {
    let startCell = [0, 0];
    let stack = [startCell];

    while (stack.length > 0) {
      let currentCell = stack.pop();
      let [x, y] = currentCell;

      // Tandai sel saat ini sebagai jalur ('P')
      grid[x][y] = "P";

      let neighbors = this.getNeighbors(x, y, grid);

      if (neighbors.length > 0) {
        stack.push(currentCell);

        let randomIndex = Math.floor(Math.random() * neighbors.length);
        let [nextX, nextY] = neighbors[randomIndex];

        // Hapus dinding antara sel saat ini dan tetangga yang dipilih
        grid[(x + nextX) / 2][(y + nextY) / 2] = "P";

        stack.push([nextX, nextY]);
      }
    }
  }

  // Mendapatkan sel-sel tetangga yang valid
  getNeighbors(x, y, grid) {
    let neighbors = [];
    let directions = [
      [-2, 0], // North
      [0, 2], // East
      [2, 0], // South
      [0, -2], // West
    ];

    for (let [dx, dy] of directions) {
      let newX = x + dx;
      let newY = y + dy;

      if (this.isValidCell(newX, newY, grid)) {
        neighbors.push([newX, newY]);
      }
    }

    return neighbors;
  }

  // Mengecek apakah sebuah sel valid untuk pembuatan jalur
  isValidCell(x, y, grid) {
    return (
      x >= 0 && x < this.rows && y >= 0 && y < this.cols && grid[x][y] === "W"
    );
  }

  // Metode untuk menggambar maze di canvas
  drawMaze() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.drawCell(row, col, this.mazeGrid[row][col]);
      }
    }
  }

  // Metode untuk menggambar satu sel
  drawCell(row, col, type) {
    this.ctx.fillStyle = type === "W" ? "black" : "white";
    this.ctx.fillRect(
      col * this.cellSize,
      row * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }

  // Metode untuk membuat dinding menghilang sementara
  hideWalls() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.mazeGrid[row][col] === "W") {
          setTimeout(() => {
            this.mazeGrid[row][col] = "P";
            this.drawCell(row, col, "P");

            setTimeout(() => {
              this.mazeGrid[row][col] = "W";
              this.drawCell(row, col, "W");
            }, this.wallHideDuration); // Dinding muncul kembali setelah durasi yang ditentukan
          }, this.wallReappearDuration); // Dinding menghilang setelah durasi yang ditentukan
        }
      }
    }
  }
}

// Export class Maze untuk digunakan di main.js
export { Maze };
