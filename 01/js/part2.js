const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const changes = lines.map(line => {
  const op = line[0]
  const opIsNeg = op === '-'
  const numStr = line.slice(1, line.length)
  const num = Number(numStr)
  return opIsNeg ? -num : num
})

const pastFreqs = new Set()

let currentFreq = 0
let changesIndex = 0

while (!pastFreqs.has(currentFreq)) {
  pastFreqs.add(currentFreq)

  currentFreq += changes[changesIndex]

  changesIndex++
  if (changesIndex === changes.length) {
    changesIndex = 0
  }
}

console.log(currentFreq)
