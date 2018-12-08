const fs = require('fs')

// const contents = fs.readFileSync('../input.txt', 'utf8')
const contents = fs.readFileSync('../in.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const branches = lines.map(line => [line[5], line[36]])

const stepTree = {}

// const exampleTree = {
//   a: {
//     b: {
//       Q: {},
//     },
//     d: {
//       e: {},
//     },
//   },
//   f: {
//     g: {
//       h: {},
//     },
//     i: {
//       j: {},
//     },
//   },
// }

const isTreeMember = (tree, searchKey) => {
  for (const key of Object.keys(tree)) {
    if (key === searchKey) {
      return true
    } else if (isTreeMember(tree[key], searchKey)) {
      return true
    }
  }

  return false
}

const attachChild = (tree, parent, child) => {
  for (const key of Object.keys(tree)) {
    if (key === parent) {
      tree[parent][child] = {}
    } else {
      attachChild(tree[key], parent, child)
    }
  }
}

const insertPair = (tree, parent, child) => {
  if (isTreeMember(tree, parent)) {
    attachChild(tree, parent, child)
  } else {
    tree[parent] = {
      [child]: {},
    }
  }
}

const breadthFirstKeyGrab = tree => {
  let keysAtThisLevel = []
  let children = []

  for (const key of Object.keys(tree)) {
    keysAtThisLevel.push(key)
    children.push(breadthFirstKeyGrab(tree[key]))
  }

  return [keysAtThisLevel, ...children]
}

const flattenDeep = arr =>
  arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  )

let uniq = arr => [...new Set(arr)]

branches.map(([parent, child]) => {
  console.log(parent, child)
  insertPair(stepTree, parent, child)
})

const allKeys = breadthFirstKeyGrab(stepTree)

const flattenedKeys = flattenDeep(allKeys)

const order = uniq(flattenedKeys.reverse()).reverse()
const orderStr = order.join('')

console.log(orderStr)
