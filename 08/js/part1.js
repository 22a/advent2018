const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const numbers = contents
  .trim()
  .split(' ')
  .map(Number)

const countMetadata = ([children, metadata]) => {
  const nestedMetadataCount = children
    .map(child => countMetadata(child))
    .reduce((a, b) => a + b, 0)
  const metadataCount = metadata.reduce((a, b) => a + b, 0)
  return nestedMetadataCount + metadataCount
}

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

console.log(countMetadata(parseNextChild()))
