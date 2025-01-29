const fs = require("fs");

const validMovements = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

// function for matching the target in the grid
const isMatch = (grid, target, row, col, dr, dc) => {
  const rowLength = grid.length;
  const colLength = grid[0].length;
  for (let i = 0; i < target.length; i++) {
    const rowIndex = row + dr * i;
    const colIndex = col + dc * i;
    if (
      rowIndex < 0 ||
      colIndex < 0 ||
      rowIndex >= rowLength ||
      colIndex >= colLength ||
      grid[rowIndex][colIndex] !== target[i]
    ) {
      return false;
    }
  }
  return true;
};

// Part One
const partOne = (data) => {
  const target = "XMAS";
  const grid = data.split("\n").map((line) => line.split(""));
  const row = grid.length;
  const col = grid[0].length;

  let count = 0;

  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (grid[r][c] === "X") {
        for (let [dr, dc] of validMovements) {
          if (isMatch(grid, target, r, c, dr, dc)) {
            count++;
          }
        }
      }
    }
  }

  return count;
};

// -------------------------------------------------------------

const isXMAS = (grid, row, col) => {
  /*
    target
    M . S
    . A .
    S . M
  */

  // Check if we have enough space around the current position
  if (
    row <= 0 ||
    row >= grid.length - 1 ||
    col <= 0 ||
    col >= grid[0].length - 1
  ) {
    return false;
  }

  const upLeft = grid[row - 1][col - 1];
  const upRight = grid[row - 1][col + 1];
  const downLeft = grid[row + 1][col - 1];
  const downRight = grid[row + 1][col + 1];

  let isFirstMatch = false;
  let isSecondMatch = false;

  if (
    (upLeft === "M" && downRight === "S") ||
    (upLeft === "S" && downRight === "M")
  ) {
    isFirstMatch = true;
  }

  if (
    (upRight === "M" && downLeft === "S") ||
    (upRight === "S" && downLeft === "M")
  ) {
    isSecondMatch = true;
  }

  return isFirstMatch && isSecondMatch;
};

// Part Two
const partTow = (data) => {
  const grid = data.split("\n").map((line) => line.split(""));
  const row = grid.length;
  const col = grid[0].length;

  let count = 0;

  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (grid[r][c] === "A") {
        if (isXMAS(grid, r, c)) {
          count++;
        }
      }
    }
  }
  return count;
};

fs.readFile("input.txt", "utf8", (err, data) => {
  const partOneResult = partOne(data);
  console.log("part one ===>", partOneResult);

  const partTowResult = partTow(data);
  console.log("part two ===>", partTowResult);
});
