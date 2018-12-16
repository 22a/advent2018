const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

let carts = []

const track = lines.map((line, j) => {
  return line
    .split('')
    .map((col, i) => {
      if ('^v<>'.includes(col)) {
        let direction
        let replacement
        switch (col) {
          case '^':
            direction = 'up'
            replacement = '|'
            break
          case 'v':
            direction = 'down'
            replacement = '|'
            break
          case '<':
            direction = 'left'
            replacement = '-'
            break
          case '>':
            direction = 'right'
            replacement = '-'
            break
          default:
            throw new Error(`I wasn't expecting to see, (${col}) here`)
        }
        carts.push({
          x: i,
          y: j,
          direction,
          nextIntersectionDirection: 'left',
        })
        return replacement
      } else {
        return col
      }
    })
    .join('')
})

let getCollision = carts => {
  let x = -1
  let y = -1

  for (let i = carts.length - 1; i >= 0; i--) {
    let currentCart = carts[i]
    let index = carts.findIndex(cart => {
      return cart.x === currentCart.x && cart.y === currentCart.y
    })
    if (index !== i) {
      return [true, currentCart.x, currentCart.y]
    }
  }
  return [false, x, y]
}

while (carts.length > 1) {
  carts.forEach(cart => {
    let newX = cart.x
    let newY = cart.y
    switch (cart.direction) {
      case 'up':
        newY--
        break
      case 'down':
        newY++
        break
      case 'left':
        newX--
        break
      case 'right':
        newX++
        break
      default:
        throw new Error(
          `I wasn't expecting to see, (${cart.direction}) as a direction`
        )
    }
    const nextSegment = track[newY][newX]
    cart.x = newX
    cart.y = newY

    switch (nextSegment) {
      case '|':
      case '-':
        break
      case '/':
        if (cart.direction === 'down') {
          cart.direction = 'left'
        } else if (cart.direction === 'up') {
          cart.direction = 'right'
        } else if (cart.direction === 'left') {
          cart.direction = 'down'
        } else if (cart.direction === 'right') {
          cart.direction = 'up'
        }
        break
      case '\\':
        if (cart.direction === 'up') {
          cart.direction = 'left'
        } else if (cart.direction === 'down') {
          cart.direction = 'right'
        } else if (cart.direction === 'right') {
          cart.direction = 'down'
        } else if (cart.direction === 'left') {
          cart.direction = 'up'
        }
        break
      case '+':
        switch (cart.nextIntersectionDirection) {
          case 'left':
            if (cart.direction === 'up') {
              cart.direction = 'left'
            } else if (cart.direction === 'down') {
              cart.direction = 'right'
            } else if (cart.direction === 'right') {
              cart.direction = 'up'
            } else if (cart.direction === 'left') {
              cart.direction = 'down'
            }
            cart.nextIntersectionDirection = 'straight'
            break
          case 'straight':
            cart.nextIntersectionDirection = 'right'
            break
          case 'right':
            if (cart.direction === 'up') {
              cart.direction = 'right'
            } else if (cart.direction === 'down') {
              cart.direction = 'left'
            } else if (cart.direction === 'right') {
              cart.direction = 'down'
            } else if (cart.direction === 'left') {
              cart.direction = 'up'
            }
            cart.nextIntersectionDirection = 'left'
            break
          default:
            throw new Error(
              `I wasn't expecting to see, (${
                cart.nextIntersectionDirection
              }) as a nextIntersectionDirection`
            )
        }
        break
      default:
        console.log(cart)
        throw new Error(
          `I wasn't expecting to see, (${nextSegment}) as a track segment`
        )
    }

    carts.sort((c1, c2) => {
      if (c1.y !== c2.y) {
        return c1.y - c2.y
      }
      return c1.x - c2.x
    })

    let [isCollision, collisionX, collisionY] = getCollision(carts)
    if (isCollision) {
      carts = carts.filter(cart => {
        return !(cart.x === collisionX && cart.y !== collisionY)
      })
    }
  })
}

console.log(`${carts[0].x},${carts[0].y}`)
