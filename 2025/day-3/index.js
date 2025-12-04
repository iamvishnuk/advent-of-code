const fs = require('fs')


const partOne = (data) => {
  const batteryBanks = data.split('\n')
  let sum = 0

  batteryBanks.forEach(battery => {
    let max = 0
    for (let i = 0; i < battery.length; i++) {
      for (let j = i + 1; j < battery.length; j++) {
        let temp = Number(battery[i] + battery[j])
        if (temp > max) {
          max = temp
        }
      }
    }
    sum += max
  });

  console.log('Part One Answer -->', sum)
}


const largestSubSequenceString = (str, k) => {
  const len = str.length


  let toRemove = len - k
  const stack = []

  for (let i = 0; i < len; i++) {
    const char = str[i]

    while (toRemove > 0 && stack.length > 0 && stack[stack.length - 1] < char) {
      stack.pop()
      toRemove--
    }
    stack.push(char);
  }

  // if Still can remove
  while (toRemove > 0) {
    stack.pop()
    toRemove--
  }

  return stack.slice(0, k).join('');

}


const partTwo = (data) => {
  const batteryBanks = data.split('\n')
  let sum = 0;

  batteryBanks.forEach(battery => {
    let max = largestSubSequenceString(battery, 12)
    sum += Number(max)
  })

  console.log('Part Two Answer -->', sum)
}


fs.readFile('input.txt', 'utf8', (_, data) => {
  partOne(data)
  partTwo(data)
})
