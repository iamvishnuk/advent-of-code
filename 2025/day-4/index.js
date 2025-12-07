const fs = require('fs');

const direction = [
  [-1, 0], // Top
  [-1, 1], // Top Right
  [0, 1], // Right
  [1, 1], // Bottom Right
  [1, 0], // Bottom
  [1, -1], // Bottom Left
  [0, -1], // Left
  [-1, -1] // To Left
];

const partOne = (data) => {
  const rollOfPaper = data.split('\n').map((item) => item.split(''));
  let numberOfPaperRoll = 0;

  for (let row = 0; row < rollOfPaper.length; row++) {
    for (let col = 0; col < rollOfPaper.length; col++) {
      if (rollOfPaper[row][col] === '@') {
        let temp = 0;
        for (let dir = 0; dir < direction.length; dir++) {
          const [r, c] = direction[dir];
          const nextRow = row + r;
          const nextCol = col + c;

          if (nextRow < 0 || nextRow >= rollOfPaper[row].length) continue;
          if (nextCol < 0 || nextCol >= rollOfPaper.length) continue;

          if (rollOfPaper[nextRow][nextCol] === '@') {
            temp++;
          }
        }

        if (temp < 4) {
          numberOfPaperRoll++;
        }
      }
    }
  }

  console.log('Part One Answer ->', numberOfPaperRoll);
};

const countAdjacent = (row, col, rollOfPaper) => {
  let count = 0;

  for (const [r, c] of direction) {
    const nextRow = row + r;
    const nextCol = col + c;

    if (nextRow < 0 || nextRow >= rollOfPaper[row].length) continue;
    if (nextCol < 0 || nextCol >= rollOfPaper.length) continue;

    if (rollOfPaper[nextRow][nextCol] === '@') {
      count++;
    }
  }

  return count;
};

const partTwo = (data) => {
  const rollOfPaper = data.split('\n').map((item) => item.split(''));
  let totalRollOfPaper = 0;

  while (true) {
    const toRemove = [];
    for (let row = 0; row < rollOfPaper.length; row++) {
      for (let col = 0; col < rollOfPaper[row].length; col++) {
        if (
          rollOfPaper[row][col] === '@' &&
          countAdjacent(row, col, rollOfPaper) < 4
        ) {
          toRemove.push([row, col]);
        }
      }
    }

    if (toRemove.length === 0) break;

    // Apply removal
    for (let [row, col] of toRemove) {
      rollOfPaper[row][col] = '.';
    }

    totalRollOfPaper += toRemove.length;
  }

  console.log('Part Two Answer ->', totalRollOfPaper);
};
fs.readFile('input.txt', 'utf8', (_, data) => {
  partOne(data);
  partTwo(data);
});
