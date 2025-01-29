const fs = require("fs");

const partOne = (data) => {
  const REGEXP = /mul\((\d+),(\d+)\)/g; // match the mul(number, number)

  const result1 = [];
  let match;

  // this is generate a 2d array of the number in the mul(2,3) string;
  while ((match = REGEXP.exec(data)) !== null) {
    result1.push([parseInt(match[1]), parseInt(match[2])]);
  }

  return result1.reduce((acc, [a, b]) => {
    return acc + a * b;
  }, 0);
};

const partTwo = (data) => {
  const mulPattern = "mul\\((\\d{1,3}),(\\d{1,3})\\)";
  const doPattern = "do\\(\\)";
  const dontPattern = "don't\\(\\)";
  const instructionPattern = `${mulPattern}|${doPattern}|${dontPattern}`;
  const instructionRegex = new RegExp(instructionPattern, "g");
  const mulRegex = new RegExp(mulPattern);

  let totalSum = 0;
  let enabled = true;

  const instructions = data.match(instructionRegex);

  if (instructions) {
    for (const instruction of instructions) {
      if (new RegExp(doPattern).test(instruction)) {
        enabled = true;
      } else if (new RegExp(dontPattern).test(instruction)) {
        enabled = false;
      } else if (enabled && mulRegex.test(instruction)) {
        const [, left, right] = instruction.match(mulRegex) ?? [];
        totalSum += parseInt(left) * parseInt(right);
      }
    }
  }

  return totalSum;
};

fs.readFile("input.txt", "utf8", (err, data) => {
  console.log("part one ===>", partOne(data));
  console.log("part two ===>", partTwo(data));
});
