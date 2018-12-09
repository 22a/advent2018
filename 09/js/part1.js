const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const [numPlayers, lastMarblePoints] = contents
  .trim()
  .split(' ')
  .map(Number)
  .filter(num => !isNaN(num))

// I can't find a clean way to generalise this marble insertion to accommodate
// these first two inputs - let's just cheat and hardcode them
let marbles = [0, 1]
let marbleI = 2
let currentI = 1
let scores = new Array(numPlayers).fill(0)
let lastScore = 0

while (marbleI <= lastMarblePoints) {
  let nextI
  if (marbleI % 23 !== 0) {
    if (currentI + 2 === marbles.length) {
      marbles.push(marbleI)
      nextI = currentI + 2
    } else {
      nextI = (currentI + 2) % marbles.length
      marbles.splice(nextI, 0, marbleI)
    }
  } else {
    nextI = currentI - 7
    if (nextI < 0) {
      nextI = marbles.length + nextI
    }
    const [removedMarble] = marbles.splice(nextI, 1)
    scores[marbleI % scores.length] += removedMarble + marbleI
  }

  currentI = nextI
  marbleI++
}

console.log(Math.max(...scores))
