const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

lines.filter(line => {
  lines.filter(otherLine => {
    if (line === otherLine) {
      return
    }

    let differingLetters = 0
    let lastDifferingLetterPosition = 0
    for (let i = 0; i < line.length; i++) {
      const a = line[i]
      const b = otherLine[i]
      if (a !== b) {
        differingLetters++
        if (differingLetters > 1) return
        lastDifferingLetterPosition = i
      }
    }

    if (differingLetters === 1) {
      const answer =
        line.slice(0, lastDifferingLetterPosition) +
        line.slice(lastDifferingLetterPosition + 1, line.length)
      console.log(answer)
    }
  })
})
