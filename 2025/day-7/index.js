const fs = require('fs');

const partOne = (data) => {
  const input = data.split('\n').map((line) => line.split(''));

  const rows = input.length;
  const cols = input[0].length;

  let startCol = input[0].indexOf('S');
  let queue = [{ row: 1, col: startCol }];
  let visited = new Set();

  let splits = 0;

  while (queue.length > 0) {
    const { row, col } = queue.shift();

    if (row < 0 || row >= rows || col < 0 || col >= cols) continue;

    let key = row + ',' + col;
    if (visited.has(key)) continue;
    visited.add(key);

    let cell = input[row][col];

    if (cell === '^') {
      splits++;
      queue.push({ row: row, col: col - 1 });
      queue.push({ row: row, col: col + 1 });
      continue;
    }

    queue.push({ row: row + 1, col });
  }

  console.log('Part One Answer ->', splits);
};

const partTwo = (data) => {
  const input = data.split('\n').map((line) => line.split(''));

  const rows = input.length;
  const cols = input[0].length;
  let startCol = input[0].indexOf('S');

  const memo = new Map();

  function dfs(row, col, visiting) {
    // out of bound -> particle left the manifold - 1 valid timeline
    if (row < 0 || row >= rows || col < 0 || col >= cols) return 1;

    const key = row + ',' + col;

    if (visiting.has(key)) return 0;

    if (memo.has(key)) return memo.get(key);

    visiting.add(key);

    let result = 0;

    if (input[row][col] === '^') {
      const left = dfs(row, col - 1, visiting);
      const right = dfs(row, col + 1, visiting);
      result = left + right;
    } else {
      result = dfs(row + 1, col, visiting);
    }

    visiting.delete(key);
    memo.set(key, result);

    return result;
  }

  const totalTimeline = dfs(1, startCol, new Set());

  console.log('Part Two Result ->', totalTimeline);
};

fs.readFile('input.txt', 'utf8', (_, data) => {
  partOne(data);
  partTwo(data);
});
