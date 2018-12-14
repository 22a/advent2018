const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const plants = lines
  .shift()
  .slice(15)
  .split('')
  .map(char => char === '#')

const rules = lines.filter(line => line[line.length - 1] === '#').map(line => ({
  ll: line[0] === '#',
  l: line[1] === '#',
  c: line[2] === '#',
  r: line[3] === '#',
  rr: line[4] === '#',
}))

const iterations = 20

//  allocate some space either side of the current edges of the plants to allow for expansion
let plantPots = new Array(iterations + plants.length + iterations + 4).fill(
  false
)

plants.forEach((plant, i) => {
  plantPots[i + iterations + 2] = plants[i]
})

for (let g = 0; g < iterations; g++) {
  // console.log(
  //   `${g}:`,
  //   plantPots.reduce((acc, plant) => acc + (plant ? '#' : '.'), '')
  // )
  plantPots = plantPots.map((plant, i) => {
    let found = false
    rules.forEach(rule => {
      const ll = plantPots[i - 2] || false
      const l = plantPots[i - 1] || false
      const r = plantPots[i + 1] || false
      const rr = plantPots[i + 2] || false

      if (
        ll === rule.ll &&
        l === rule.l &&
        plant === rule.c &&
        r === rule.r &&
        rr === rule.rr
      ) {
        found = true
      }
    })
    return found
  })
}

const sumOfPlantNumsContainingPlants = plantPots.reduce((acc, plant, i) => {
  if (plant) {
    acc += i - (iterations + 2)
  }
  return acc
}, 0)

console.log(sumOfPlantNumsContainingPlants)
