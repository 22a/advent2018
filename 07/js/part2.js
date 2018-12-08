const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const branches = lines.map(line => [line[5], line[36]])

const deps = branches.reduce((acc, [parent, child]) => {
  acc[parent] = acc[parent] || {
    name: parent,
    dependentOn: {},
    durationLeft: 60 + (parent.charCodeAt(0) - 64),
  }
  acc[child] = acc[child] || {
    name: child,
    dependentOn: {},
    durationLeft: 60 + (child.charCodeAt(0) - 64),
  }
  acc[child].dependentOn[parent] = true
  return acc
}, {})

let order = ''
let done = false
let second = 0
let workers = Array(5).fill('')

while (!done) {
  const availableNodes = Object.values(deps).filter(
    node => Object.keys(node.dependentOn).length === 0
  )

  if (availableNodes.length === 0) {
    done = true
    console.log(second)
  } else {
    const availableNodesNotInProgress = availableNodes.filter(
      node => !workers.includes(node.name)
    )
    const sortedAvailableNodesNotInProgress = availableNodesNotInProgress.sort(
      (a, b) => (a.name < b.name ? -1 : 1)
    )

    let nextFreeNodeIndex = 0
    workers = workers.map(worker => {
      if (worker !== '') {
        return worker
      } else {
        const nextNode = sortedAvailableNodesNotInProgress[nextFreeNodeIndex]
        if (nextNode) {
          nextFreeNodeIndex++
          return nextNode.name
        } else {
          return ''
        }
      }
    })

    workers.forEach((worker, i) => {
      if (!deps[worker]) return

      deps[worker].durationLeft -= 1

      if (deps[worker].durationLeft === 0) {
        delete deps[worker]
        order += worker
        workers[i] = ''

        Object.values(deps).forEach(node => {
          delete node.dependentOn[worker]
        })
      }
    })

    second += 1
  }
}
