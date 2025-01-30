const fs = require("fs");

// Checks if the update sequence follows all rules
// Rules are pairs of numbers [a,b] where 'a' should come before 'b' in the sequence
// Returns false if any rule is violated (a comes after b)
const isValidUpdate = (rules, update) => {
  for (let [a, b] of rules) {
    if (
      update.includes(a) &&
      update.includes(b) &&
      update.indexOf(a) > update.indexOf(b)
    ) {
      return false;
    }
  }
  return true;
};

// Corrects an invalid update sequence by swapping numbers until all rules are satisfied
// Uses bubble sort-like approach to swap adjacent elements that violate rules
const correctUpdate = (rules, update) => {
  while (!isValidUpdate(rules, update)) {
    for (let [a, b] of rules) {
      if (
        update.includes(a) &&
        update.includes(b) &&
        update.indexOf(a) > update.indexOf(b)
      ) {
        // Swap the elements that violate the rule
        const temp = update[update.indexOf(a)];
        update[update.indexOf(a)] = update[update.indexOf(b)];
        update[update.indexOf(b)] = temp;
      }
    }
  }
  return update;
};

// Part One: Sum the middle elements of valid update sequences
const partOne = (data) => {
  // Split input into rules and updates sections
  const [rules, updates] = data.split("\n\n");

  // Parse rules and updates into arrays of numbers
  const rulesArray = rules
    .split("\n")
    .map((rule) => rule.split("|").map(Number));
  const updatesArray = updates
    .split("\n")
    .map((update) => update.split(",").map(Number));

  let result = 0;

  // Process each update sequence
  for (let r = 0; r < updatesArray.length; r++) {
    let update = updatesArray[r];
    // Only add middle element if sequence is valid
    if (isValidUpdate(rulesArray, update)) {
      result += update[Math.floor(update.length / 2)];
    }
  }

  return result;
};

// Part Two: Sum the middle elements after correcting invalid sequences
const partTwo = (data) => {
  // Split and parse input similar to Part One
  const [rules, updates] = data.split("\n\n");

  const rulesArray = rules
    .split("\n")
    .map((rule) => rule.split("|").map(Number));
  const updatesArray = updates
    .split("\n")
    .map((update) => update.split(",").map(Number));

  let result = 0;

  // Process each update sequence
  for (let r = 0; r < updatesArray.length; r++) {
    let update = updatesArray[r];
    // If sequence is invalid, correct it before adding middle element
    if (!isValidUpdate(rulesArray, update)) {
      update = correctUpdate(rulesArray, update);
      result += update[Math.floor(update.length / 2)];
    }
  }

  return result;
};

fs.readFile("input.txt", "utf8", (err, data) => {
  const partOneResult = partOne(data);
  const partTwoResult = partTwo(data);

  console.log("partOneResult ===>", partOneResult);
  console.log("partTwoResult ===>", partTwoResult);
});
