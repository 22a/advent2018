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

const finalFreq = changes.reduce((acc, freqChange) => acc + freqChange, 0)

console.log(finalFreq)
