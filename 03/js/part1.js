const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const patches = lines.map(line => {
  const pattern = /\d+/g
  const matches = line.match(pattern)

  return {
    leftPad: Number(matches[1]),
    topPad: Number(matches[2]),
    width: Number(matches[3]),
    height: Number(matches[4]),
  }
})

const coordsToKey = (x, y) => `${x},${y}`

const increaseCountForCoords = (fabric, x, y) => {
  const keyForCoords = coordsToKey(x, y)
  const countAtCoords = fabric[keyForCoords] || 0
  // mutate the fabric param in place, js doesn't seem to handle immutability well here
  fabric[keyForCoords] = countAtCoords + 1
}

const fabricUsage = patches.reduce((acc, patch) => {
  const {leftPad, topPad, width, height} = patch
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      increaseCountForCoords(acc, j + leftPad, i + topPad)
    }
  }
  return acc
}, {})

const numCollisions = Object.values(fabricUsage).filter(count => count > 1)
  .length

console.log(numCollisions)
