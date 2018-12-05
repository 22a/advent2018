const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')

const units = contents.trim().split('')

const removePair = (arr, i) => arr.splice(i, 2)

const shortestPolymer = 'abcdefghijklmnopqrstuvwxyz'
  .split('')
  .reduce((shortestSoFar, letter) => {
    const localUnits = units.filter(
      unit => unit !== letter && unit !== letter.toUpperCase()
    )

    let i = 0

    while (i < localUnits.length - 1) {
      const a = localUnits[i].codePointAt(0)
      const b = localUnits[i + 1].codePointAt(0)

      if (Math.abs(a - b) === 32) {
        removePair(localUnits, i)
        i = i - 2 > 0 ? i - 2 : 0
      } else {
        i++
      }
    }

    return Math.min(shortestSoFar, localUnits.length)
  }, units.length)

console.log(shortestPolymer)
