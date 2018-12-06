const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const points = lines.map((line, i) => {
  const [x, y] = line.split(',').map(Number)
  return {x, y, id: i}
})

const {minX, maxX, minY, maxY} = points.reduce(
  (acc, point) => {
    return {
      minX: Math.min(point.x, acc.minX),
      maxX: Math.max(point.x, acc.maxX),
      minY: Math.min(point.y, acc.minY),
      maxY: Math.max(point.y, acc.maxY),
    }
  },
  {
    minX: points[0].x,
    maxX: points[0].x,
    minY: points[0].y,
    maxY: points[0].y,
  }
)

// copy our code from part1, let's assume that any points outside the bounding
// rect of all points will have Σ(manhattanDistances) >= 10000
const normalisedPoints = points.map(point => ({
  x: point.x - minX,
  y: point.y - minY,
}))

const manhattanDistance = (x1, y1, x2, y2) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2)

const sumOfAllManhattanDistances = (x, y) =>
  normalisedPoints
    .map(point => manhattanDistance(point.x, point.y, x, y))
    .reduce((a, b) => a + b, 0)

const xLen = maxX - minX
const yLen = maxY - minY

let safeZoneCount = 0

for (let yI = 0; yI < yLen; yI++) {
  for (let xI = 0; xI < xLen; xI++) {
    if (sumOfAllManhattanDistances(xI, yI) < 10000) {
      safeZoneCount++
    }
  }
}

console.log(safeZoneCount)
