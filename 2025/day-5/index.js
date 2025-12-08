const fs = require('fs');

const partOne = (data) => {
  const input = data
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const ranges = [];
  const numbers = [];

  input.forEach((item) => {
    if (item.includes('-')) {
      ranges.push(item);
    } else {
      numbers.push(Number(item));
    }
  });

  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    for (let j = 0; j < ranges.length; j++) {
      const [start, end] = ranges[j].split('-').map(Number);
      if (num >= start && num <= end) {
        count++;
        break;
      }
    }
  }

  console.log('Part One Answer ->', count);
};

const partTwo = (data) => {
  const input = data
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  let total = 0;

  const ranges = input
    .filter((item) => item.includes('-'))
    .map((item) => item.split('-').map(Number));

  ranges.sort((a, b) => a[0] - b[0]);

  const meregedRanges = [];
  let [currStart, currEnd] = ranges[0];

  for (let r = 0; r < ranges.length; r++) {
    const [start, end] = ranges[r];

    if (start <= currEnd + 1) {
      currEnd = Math.max(currEnd, end);
    } else {
      meregedRanges.push([currStart, currEnd]);
      currStart = start;
      currEnd = end;
    }
  }

  meregedRanges.push([currStart, currEnd]);

  for (const [start, end] of meregedRanges) {
    total += end - start + 1;
  }

  console.log('Part Two Answer ->', total);
};

fs.readFile('input.txt', 'utf8', (_, data) => {
  partOne(data);
  partTwo(data);
});
