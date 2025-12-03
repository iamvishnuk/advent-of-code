const fs = require("fs");

const MAX = 100;
const START = 50;

const partOne = (data) => {
  const input = data.split("\n");
  let current = START;
  let password = 0;

  for (let i = 0; i < input.length; i++) {
    const str = input[i];
    const dir = str[0];
    const number = Number(str.slice(1));
    if (dir === "R") {
      current = (current + number) % MAX;
    } else if (dir === "L") {
      current = (current - number) % MAX;
      if (current < 0) {
        current = MAX + current;
      }
    }
    if (current === 0) {
      password++;
    }
  }
  console.log(`Part One Password -> ${password}`);
};

const partTwo = (data) => {
  const rotations = data.split("\n").filter((line) => line.trim());
  let current = START;
  let password = 0;

  rotations.forEach((rotation) => {
    const dir = rotation[0];
    const value = Number(rotation.slice(1));

    if (dir === "R") {
      // Moving right (clockwise)
      for (let i = 0; i < value; i++) {
        current = (current + 1) % MAX;
        if (current === 0) {
          password++;
        }
      }
    } else if (dir === "L") {
      // Moving left (counter-clockwise)
      for (let i = 0; i < value; i++) {
        current = (current - 1 + MAX) % MAX;
        if (current === 0) {
          password++;
        }
      }
    }
  });

  console.log(`Part Two Password -> ${password}`);
};

fs.readFile("input.txt", "utf8", (err, data) => {
  partOne(data);
  partTwo(data);
});
