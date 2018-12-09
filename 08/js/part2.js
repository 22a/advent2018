const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const numbers = contents
  .trim()
  .split(' ')
  .map(Number)

let i = 0
const consume = () => numbers[i++]

const parseNextChild = () => {
  const childrenCount = consume()
  const metadataCount = consume()
  const children = []
  const metadata = []

  for (let i = 0; i < childrenCount; i++) {
    children.push(parseNextChild())
  }

  for (let i = 0; i < metadataCount; i++) {
    metadata.push(consume())
  }

  return [children, metadata]
}

const calculateValue = ([children, metadata]) => {
  if (children.length === 0) {
    return metadata.reduce((a, b) => a + b, 0)
  } else {
    return metadata
      .map(childIndex => {
        const indexedChild = children[childIndex - 1]
        if (indexedChild) {
          return calculateValue(indexedChild)
        } else {
          return 0
        }
      })
      .reduce((a, b) => a + b, 0)
  }
}

console.log(calculateValue(parseNextChild()))
