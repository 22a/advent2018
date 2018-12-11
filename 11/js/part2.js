const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const gridSerialNumber = Number(contents.trim())

const powerAtCoord = (x, y) => {
  const rackId = x + 10
  let powerLevel = rackId * y
  powerLevel += gridSerialNumber
  powerLevel *= rackId
  powerLevel = Math.floor((powerLevel % 1000) / 100)
  powerLevel -= 5
  return powerLevel
}

const generatePowerGrid = (h, w) => {
  const scratch = new Array(h)
  for (let j = 0; j < h; j++) {
    scratch[j] = new Array(w)
    for (let i = 0; i < w; i++) {
      scratch[j][i] = powerAtCoord(i, j)
    }
  }
  return scratch
}

const mostPowerfulSquare = (maxN, grid) => {
  let highestPowerValue = 0
  let highestPowerCoord = '1,1,1'

  for (let n = 1; n <= maxN; n++) {
    for (let y = 0; y < grid.length - n; y++) {
      for (let x = 0; x < grid[0].length - n; x++) {
        let squarePower = 0
        for (let j = 0; j < n; j++) {
          for (let i = 0; i < n; i++) {
            squarePower += grid[y + j][x + i]
          }
        }
        if (squarePower > highestPowerValue) {
          highestPowerValue = squarePower
          highestPowerCoord = `${x},${y},${n}`
        }
      }
    }
  }

  return highestPowerCoord
}

const squareSize = 300

const powerGrid = generatePowerGrid(squareSize, squareSize)

const mostPowerfulCoord = mostPowerfulSquare(squareSize, powerGrid)

console.log(mostPowerfulCoord)
