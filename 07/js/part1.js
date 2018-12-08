const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const branches = lines.map(line => [line[5], line[36]])

const deps = branches.reduce((acc, [parent, child]) => {
  acc[parent] = acc[parent] || {name: parent, dependentOn: {}}
  acc[child] = acc[child] || {name: child, dependentOn: {}}
  acc[child].dependentOn[parent] = true
  return acc
}, {})

let order = ''
let done = false

while (!done) {
  const availableNodes = Object.values(deps).filter(
    node => Object.keys(node.dependentOn).length === 0
  )

  if (availableNodes.length === 0) {
    done = true
    console.log(order)
  } else {
    const sortedAvailableNodes = availableNodes.sort(
      (a, b) => (a.name < b.name ? -1 : 1)
    )

    const nextNodeName = sortedAvailableNodes[0].name

    Object.values(deps).forEach(node => {
      delete node.dependentOn[nextNodeName]
    })

    delete deps[nextNodeName]

    order += nextNodeName
  }
}
