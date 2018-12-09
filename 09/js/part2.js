const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const [numPlayers, lastMarblePoints] = contents
  .trim()
  .split(' ')
  .map(Number)
  .filter(num => !isNaN(num))

let marbleI = 1
let scores = new Array(numPlayers).fill(0)

let currentMarble = {}
currentMarble.value = 0
currentMarble.prev = currentMarble
currentMarble.next = currentMarble

while (marbleI <= lastMarblePoints * 100) {
  if (marbleI % 23 !== 0) {
    const next = currentMarble.next
    const newMarble = {value: marbleI, prev: next, next: next.next}
    next.next.prev = newMarble
    next.next = newMarble
    currentMarble = newMarble
  } else {
    for (let i = 0; i < 7; i++) {
      currentMarble = currentMarble.prev
    }
    scores[marbleI % scores.length] += currentMarble.value + marbleI
    currentMarble.next.prev = currentMarble.prev
    currentMarble.prev.next = currentMarble.next
    currentMarble = currentMarble.next
  }

  marbleI++
}

console.log(Math.max(...scores))
