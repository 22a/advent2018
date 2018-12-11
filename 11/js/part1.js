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

const mostPowerfulNxNSquare = (n, grid) => {
  const powers = {}
  for (let y = 0; y < grid.length - n; y++) {
    for (let x = 0; x < grid[0].length - n; x++) {
      let squarePower = 0
      for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
          squarePower += grid[y + j][x + i]
        }
      }
      powers[`${x},${y}`] = squarePower
    }
  }
  const {highestPowerValue, highestPowerCoord} = Object.keys(powers).reduce(
    (acc, coord) => {
      const power = powers[coord]
      if (!acc.highestPowerValue || acc.highestPowerValue < power) {
        return {
          highestPowerValue: power,
          highestPowerCoord: coord,
        }
      } else {
        return acc
      }
    }
  )
  return highestPowerCoord
}

const powerGrid = generatePowerGrid(300, 300)

const mostPowerfulCoord = mostPowerfulNxNSquare(3, powerGrid)

console.log(mostPowerfulCoord)
