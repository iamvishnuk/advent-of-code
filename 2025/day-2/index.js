const fs = require('fs')

const partOne = (data) => {
  const ranges = data.split(',')
  let sum = 0

  ranges.forEach(range => {
    const [start, end] = range.split('-')

    for (let i = Number(start); i <= Number(end); i++) {
      let num = String(i)
      let mid = num.length / 2
      let firstHalf = num.slice(0, mid)
      let secondHalf = num.slice(mid)

      if (firstHalf === secondHalf) {
        sum += i
      }
    }
  });

  console.log('Part One Answer -->', sum)
}

const isInvalid = (str) => {
  return /^(.+)\1+$/.test(str);
}

const partTwo = (data) => {
  const ranges = data.split(',')
  let sum = 0

  ranges.forEach(range => {
    const [start, end] = range.split('-').map(Number)

    for (let i = start; i <= end; i++) {
      let num = String(i)
      if (isInvalid(num)) {
        sum += i
      }
    }
  })
  console.log('Part Two Answer -->', sum)
}

fs.readFile("input.txt", "utf8", (_, data) => {
  partOne(data)
  partTwo(data)
})
