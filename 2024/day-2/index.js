const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  const arr = data.split("\n").map((row) => row.split(" ").map(Number));

  // part - 1
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (checkArray(arr[i])) {
      count++;
    }
  }
  console.log("count", count);

  // part - 2
  let count2 = 0;
  for (let i = 0; i < arr.length; i++) {
    if (checkArray2([...arr[i]])) {
      // Create copy of array to avoid modifying original
      count2++;
    }
  }
  console.log("count2", count2);
});

// check array is increasing or decreasing
const checkArray = (arr) => {
  const isIncreasing = arr[1] > arr[0];
  const isDecreasing = arr[1] < arr[0];

  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];

    // check if difference is at least 1 and at most 3
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;

    if (isIncreasing && diff <= 0) return false; // increasing but a decreasing or no change
    if (isDecreasing && diff >= 0) return false; // decreasing but an increasing or no change
  }

  return true;
};

// check array is increasing or decreasing by removing one element
const checkArray2 = (arr) => {
  // Try removing each element and check if remaining array is valid
  for (let i = 0; i < arr.length; i++) {
    const newArr = [...arr]; // create copy of array
    newArr.splice(i, 1); // (index, count to remove)
    if (checkArray(newArr)) {
      return true;
    }
  }
  return false;
};
