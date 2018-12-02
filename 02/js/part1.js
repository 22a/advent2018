const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const boxCounts = lines.map(line => {
  return Array.from(line).reduce((acc, char) => {
    return {
      ...acc,
      [char]: acc[char] ? acc[char] + 1 : 1,
    }
  }, {})
})

const twosAndThrees = boxCounts.reduce(
  (acc, counts) => {
    const letterFrequencies = Object.values(counts)
    const hasTwos = letterFrequencies.includes(2)
    const hasThrees = letterFrequencies.includes(3)
    return {
      twos: hasTwos ? acc.twos + 1 : acc.twos,
      threes: hasThrees ? acc.threes + 1 : acc.threes,
    }
  },
  {twos: 0, threes: 0}
)

console.log(twosAndThrees.twos * twosAndThrees.threes)
