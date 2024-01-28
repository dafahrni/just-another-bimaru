export class GameModel {
  constructor(side = 3) {
    this._side = side;
    this._size = side * side;
    this._player = "X";
    this._cells = Array.from({ length: this.size }, () => new Cell());
  }

  get side() {
    return this._side;
  }

  get size() {
    return this._size;
  }

  nextPlayer() {
    this._player = this._player === "X" ? "O" : "X";
  }

  get player() {
    return this._player;
  }

  readCell(index) {
    return this._isValid(index) ? this._cells[index].value : "!";
  }

  changeCell(index) {
    if (!this._isValid(index)) {
      return false;
    }
    const cell = this._cells[index];
    if (!cell.isEmpty) {
      return false;
    }
    cell.value = this.player;
    console.info(this._asText);
    return true;
  }

  resetCells() {
    this._cells.forEach((c) => c.reset());
    this._player = "X";
    console.info(this._asText);
  }

  checkForWinner() {
    // Die Logik für die Überprüfung eines Gewinners
    // Beispiel: bei einer Zeile, Spalte oder Diagonale mit dem gleichen Spieler gibt es einen Gewinner.
    const rows = this._asText.split("\n");
    const board = Array.from(rows, (row) => row.split(" "));

    return checkLines(board, 3);

    // Überprüfen von horizontalen Linien
    for (let row = 0; row < this.side; row++) {
      if (
        board[row][0] !== "." &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]
      ) {
        return true; // Gewonnen
      }
    }

    // Überprüfen von vertikalen Linien
    for (let col = 0; col < this.side; col++) {
      if (
        board[0][col] !== "." &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]
      ) {
        return true; // Gewonnen
      }
    }

    // Überprüfen der Diagonalen
    if (
      board[0][0] !== "." &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return true; // Gewonnen
    }

    if (
      board[0][2] !== "." &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return true; // Gewonnen
    }

    return false; // Kein Gewinner
  }

  checkForDraw() {
    // Überprüfen, ob alle Kacheln belegt sind
    for (const cell of this._cells) {
      if (cell.isEmpty) {
        // Es gibt mindestens eine leere Kachel, also kein Unentschieden
        return false;
      }
    }
    // Alle Kacheln sind belegt, es ist ein Unentschieden
    return true;
  }

  toString() {
    return `text: ${this._asText}`;
  }

  get _asText() {
    let text = "";
    let count = 0;
    for (const cell of this._cells) {
      count++;
      text += cell.value;
      text = count % this.side == 0 ? text + "\n" : text + " ";
    }
    return text.slice(0, -1);
  }

  _isValid(index) {
    if (index < 0 || index >= this.size) {
      console.error(
        `Index ${index} outside of intervall [0..${this.size - 1}]`
      );
      return false;
    }
    return true;
  }
}

class Cell {
  constructor(player = null) {
    this._value = this.isValid(player) ? player : ".";
  }

  get isEmpty() {
    return this.value === ".";
  }

  get value() {
    return this._value;
  }

  set value(player) {
    if (!this.isEmpty) {
      return;
    }
    if (!this.isValid(player)) {
      return;
    }
    this._value = player;
  }

  reset() {
    this._value = ".";
  }

  isValid(player) {
    return player === "X" || player === "O";
  }

  toString() {
    return `value: ${this.value}, isEmpty: ${this.isEmpty}`;
  }
}

function checkLines(grid, targetCount) {
  const n = grid.length;

  function transpose(arr) {
    return arr[0].map((_, i) => arr.map((row) => row[i]));
  }

  // Funktion zur Überprüfung von Zeilen und Spalten
  function checkRowCol(arr) {
    for (let i = 0; i < n; i++) {
      let count = 1;
      for (let j = 1; j < n; j++) {
        if (arr[i][j] !== "." && arr[i][j] === arr[i][j - 1]) {
          count++;
          if (count === targetCount) {
            return true;
          }
        } else {
          count = 1;
        }
      }
    }
    return false;
  }

  // Überprüfe horizontale und vertikale Linien
  if (checkRowCol(grid) || checkRowCol(transpose(grid))) {
    return true;
  }

  // Überprüfe diagonale Linien
  for (let i = 0; i <= n - targetCount; i++) {
    for (let j = 0; j <= n - targetCount; j++) {
      // Überprüfe Hauptdiagonale
      let countDiagonal1 = 1;
      // Überprüfe Nebendiagonale
      let countDiagonal2 = 1;

      for (let k = 1; k < targetCount; k++) {
        if (
          grid[i + k][j + k] !== "." &&
          grid[i + k][j + k] === grid[i + k - 1][j + k - 1]
        ) {
          countDiagonal1++;
          if (countDiagonal1 === targetCount) {
            return true;
          }
        }

        if (
          grid[i + k][j + targetCount - 1 - k] !== "." &&
          grid[i + k][j + targetCount - 1 - k] ===
            grid[i + k - 1][j + targetCount - k]
        ) {
          countDiagonal2++;
          if (countDiagonal2 === targetCount) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

// Beispielaufruf
const grid = [
  [".", ".", "."],
  [".", ".", "X"],
  [".", ".", "X"],
];

const targetCount = 3;

if (checkLines(grid, targetCount)) {
  console.info(`Row with ${targetCount} similar elements exists.`);
} else {
  console.info(`No row with ${targetCount} similar elements exists.`);
}
