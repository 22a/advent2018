const fs = require('fs')
// const child_process = require('child_process')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const carts = []

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

// const printTrack = () => {
//   const printedLines = track.map((line, j) => {
//     return line
//       .split('')
//       .map((col, i) => {
//         let ret = col
//         carts.forEach(cart => {
//           if (cart.x === i && cart.y === j) {
//             switch (cart.direction) {
//               case 'up':
//                 ret = '^'
//                 break
//               case 'down':
//                 ret = 'v'
//                 break
//               case 'left':
//                 ret = '<'
//                 break
//               case 'right':
//                 ret = '>'
//                 break
//             }
//           }
//         })
//         return ret
//       })
//       .join('')
//   })
//   console.log('')
//   printedLines.map(line => console.log(line))
// }

// track.map(line => console.log(line))
// console.log(carts)

const getOccupiedTracks = carts => carts.map(cart => `${cart.x},${cart.y}`)

let occupiedTracks = getOccupiedTracks(carts)

let shitWeHaveCollided = false

while (!shitWeHaveCollided) {
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
    if (occupiedTracks.includes(`${newX},${newY}`)) {
      console.log(`${cart.x},${cart.y}`)
      shitWeHaveCollided = true
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
  })

  // printTrack()
  // child_process.execSync('sleep 1')

  occupiedTracks = getOccupiedTracks(carts)
  occupiedTracks.forEach((segment, i) => {
    if (occupiedTracks.slice(i + 1).includes(segment)) {
      console.log(segment)
      shitWeHaveCollided = true
    }
  })
}
