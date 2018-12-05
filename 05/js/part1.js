const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')

const units = contents.trim().split('')

const removePair = (arr, i) => arr.splice(i, 2)

let i = 0

while (i < units.length - 1) {
  const a = units[i].codePointAt(0)
  const b = units[i + 1].codePointAt(0)

  if (Math.abs(a - b) === 32) {
    removePair(units, i)
    i = i - 2 > 0 ? i - 2 : 0
  } else {
    i++
  }
}

console.log(units.length)
