const { log } = require('console');
const fs = require('fs');

const partOne = (data) => {
  const grid = data
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => line.trim().split(/\s+/).filter(Boolean));

  let totalSum = 0;

  const rows = grid.length - 1;
  const cols = grid[rows].length;

  let c = 0;
  let r = rows;

  while (c < cols) {
    let operator = grid[r][c];
    let sum = operator === '*' ? 1 : 0;
    for (let i = r - 1; i >= 0; i--) {
      let num = Number(grid[i][c]);
      if (operator === '*') {
        sum *= num;
      } else {
        sum += num;
      }
    }
    totalSum += sum;
    c++;
  }

  console.log('Part One Answer ->', totalSum);
};

const partTwo = (data) => {
  const rows = data
    .trimEnd()
    .split('\n')
    .map((r) => r.split(''));

  const height = rows.length;
  const width = Math.max(...rows.map((r) => r.length));

  // Normalize row lengths
  rows.forEach((r) => {
    while (r.length < width) r.push(' ');
  });

  // 2. Extract columns (right-to-left)
  const columns = [];
  for (let c = width - 1; c >= 0; c--) {
    const col = [];
    for (let r = 0; r < height; r++) col.push(rows[r][c]);
    columns.push(col);
  }

  const problems = [];
  let current = [];

  for (const col of columns) {
    const isEmpty = col.every((c) => c === ' ');
    if (isEmpty) {
      if (current.length > 0) {
        problems.push(current);
        current = [];
      }
    } else {
      current.push(col);
    }
  }

  if (current.length > 0) {
    problems.push(current);
  }

  let total = 0;

  for (const prob of problems) {
    const operator = prob[prob.length - 1][height - 1];

    const number = prob.map((item) => {
      const digits = item.slice(0, -1).join('').trim();
      return Number(digits);
    });

    let result;
    if (operator === '*') {
      result = number.reduce((a, c) => a * c, 1);
    } else if (operator === '+') {
      result = number.reduce((a, c) => a + c, 0);
    }

    total += result;
  }
  console.log('Part Two Answer ->', total);
};

fs.readFile('input.txt', 'utf8', (_, data) => {
  partOne(data);
  partTwo(data);
});
