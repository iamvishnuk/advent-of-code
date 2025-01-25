const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  const arr = data.split("\n").map((line) => line.split("   "));

  const leftArray = arr.map(([left, _]) => +left).sort();
  const rightArray = arr.map(([_, right]) => +right).sort();

  console.log("leftArray", leftArray);
  console.log("rightArray", rightArray);

  // part - 1
  let sum = 0;
  for (let i = 0; i < leftArray.length; i++) {
    sum += Math.abs(rightArray[i] - leftArray[i]);
  }

  console.log("sum", sum);

  // part - 2
  let sum2 = 0;
  for (let i = 0; i < leftArray.length; i++) {
    const number = leftArray[i];

    const startIndex = rightArray.indexOf(number);
    if (startIndex === -1) continue;

    const endIndex = rightArray.lastIndexOf(number);

    sum2 += (endIndex - startIndex + 1) * number;
  }

  console.log("sum2", sum2);
});
