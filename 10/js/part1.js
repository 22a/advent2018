const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const stars = lines.map(line => {
  const [_, b, c] = line.split('<')
  const [coords] = b.split('>')
  const [velocity] = c.split('>')
  const [x, y] = coords.split(',').map(Number)
  const [vx, vy] = velocity.split(',').map(Number)
  return {x, y, vx, vy}
})

const thereIsAStarAtPos = (x, y) => {
  for (const star of stars) {
    if (x === star.x && y === star.y) {
      return true
    }
  }
  return false
}

const minMaxStar = () => {
  const {xs, ys} = stars.reduce(
    (acc, star) => {
      acc.xs.push(star.x)
      acc.ys.push(star.y)
      return acc
    },
    {xs: [], ys: []}
  )
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  return {
    minX,
    maxX,
    minY,
    maxY,
  }
}

const boundingBoxAreaLessThan = n => {
  const {minX, maxX, minY, maxY} = minMaxStar()

  return n > (maxX - minX) * (maxY - minY)
}

const printStars = () => {
  const {minX, maxX, minY, maxY} = minMaxStar()

  for (let y = minY; y < maxY + 1; y++) {
    for (let x = minX; x < maxX + 1; x++) {
      process.stdout.write(thereIsAStarAtPos(x, y) ? '#' : '.')
    }
    process.stdout.write('\n')
  }
}

while (true) {
  // 1000 is a magic number
  if (boundingBoxAreaLessThan(1000)) {
    printStars()
  }

  stars.forEach(star => {
    star.x += star.vx
    star.y += star.vy
  })
}
