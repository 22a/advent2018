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

const manhattanDistance = (x1, y1, x2, y2) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2)

const getOwner = (x, y) => {
  let closestPointSoFar = points[0].id
  let shortestDistanceSoFar = manhattanDistance(x, y, points[0].x, points[0].y)
  let jointOwner = false
  for (let point of points) {
    const dist = manhattanDistance(x, y, point.x, point.y)
    if (dist < shortestDistanceSoFar) {
      jointOwner = false
      shortestDistanceSoFar = dist
      closestPointSoFar = point.id
    } else if (dist === shortestDistanceSoFar) {
      jointOwner === true
    }
  }
  return jointOwner ? NaN : closestPointSoFar
}

const ownersWhichHaveInfiniteOwnership = new Set()
const ownershipCounts = {}

for (let yI = minY; yI <= maxY; yI++) {
  for (let xI = minX; xI <= maxX; xI++) {
    const owner = getOwner(xI, yI)
    if (!isNaN(owner)) {
      ownershipCounts[owner] = ownershipCounts[owner]
        ? ownershipCounts[owner] + 1
        : 1
    }
    if (yI === minY || yI === maxY || xI === minX || xI === maxX) {
      ownersWhichHaveInfiniteOwnership.add(owner)
    }
  }
}

const eligibleOwners = Object.keys(ownershipCounts).filter(
  ownerId => !ownersWhichHaveInfiniteOwnership.has(ownerId)
)

const eligibleOwnersOwnershipCounts = eligibleOwners.reduce(
  (acc, ownerId) => ({
    ...acc,
    [ownerId]: ownershipCounts[ownerId],
  }),
  {}
)

const largestNonInfiniteOwnershipCount = Math.max(
  ...Object.values(eligibleOwnersOwnershipCounts)
)

console.log(largestNonInfiniteOwnershipCount)
