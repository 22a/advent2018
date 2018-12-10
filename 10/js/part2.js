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

let second = 0

while (true) {
  // again, 1000 is a magic number
  if (boundingBoxAreaLessThan(1000)) {
    console.log(second)
  }

  stars.forEach(star => {
    star.x += star.vx
    star.y += star.vy
  })

  second++
}
