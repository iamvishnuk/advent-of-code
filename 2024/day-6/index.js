const fs = require("fs");

const findTheGuard = (arr) => {
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (arr[row][col] === "^") {
        return [row, col];
      }
    }
  }
};

const partOne = (data) => {
  // conver the data into 2d array
  const result = data.split("\n").map((item) => item.split(""));
  console.log(result);

  const guard = findTheGuard(result);
  console.log("guard ===>", guard);
};

fs.readFile("example.txt", "utf8", (err, data) => {
  partOne(data);
});
