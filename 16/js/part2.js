const fs = require('fs')

const in_1 = fs.readFileSync('../input_1.txt', 'utf8')
const in_2 = fs.readFileSync('../input_2.txt', 'utf8')
const samples = in_1.split('\n').filter(line => line !== '')
const input_ops = in_2
  .split('\n')
  .filter(line => line !== '')
  .map(line => line.split(' ').map(Number))

const beforeAfterRegex = /........\[(\d+), (\d+), (\d+), (\d+)\]/

const addr = (regs, a, b, r) => {
  const rs = regs.slice(0)
  rs[r] = rs[a] + rs[b]
  return rs
}
const addi = (regs, a, i, r) => {
  const rs = regs.slice(0)
  rs[r] = rs[a] + i
  return rs
}

const mulr = (regs, a, b, r) => {
  const rs = regs.slice(0)
  rs[r] = rs[a] * rs[b]
  return rs
}
const muli = (regs, a, i, r) => {
  const rs = regs.slice(0)
  rs[r] = rs[a] * i
  return rs
}

const banr = (regs, a, b, r) => {
  const rs = regs.slice(0)
  rs[r] = rs[a] & rs[b]
  return rs
}
const bani = (regs, a, i, r) => {
  const rs = regs.slice(0)
  rs[r] = rs[a] & i
  return rs
}

const borr = (regs, a, b, r) => {
  const rs = regs.slice(0)
  rs[r] = rs[a] | rs[b]
  return rs
}
const bori = (regs, a, i, r) => {
  const rs = regs.slice(0)
  rs[r] = rs[a] | i
  return rs
}

const setr = (regs, a, _, r) => {
  const rs = regs.slice(0)
  rs[r] = rs[a]
  return rs
}
const seti = (regs, i, _, r) => {
  const rs = regs.slice(0)
  rs[r] = i
  return rs
}

const gtir = (regs, i, a, r) => {
  const rs = regs.slice(0)
  rs[r] = Number(i > rs[a])
  return rs
}
const gtri = (regs, a, i, r) => {
  const rs = regs.slice(0)
  rs[r] = Number(rs[a] > i)
  return rs
}
const gtrr = (regs, a, b, r) => {
  const rs = regs.slice(0)
  rs[r] = Number(rs[a] > rs[b])
  return rs
}

const eqir = (regs, i, a, r) => {
  const rs = regs.slice(0)
  rs[r] = Number(i === rs[a])
  return rs
}
const eqri = (regs, a, i, r) => {
  const rs = regs.slice(0)
  rs[r] = Number(rs[a] === i)
  return rs
}
const eqrr = (regs, a, b, r) => {
  const rs = regs.slice(0)
  rs[r] = Number(rs[a] === rs[b])
  return rs
}

const ops = {
  addr,
  addi,
  mulr,
  muli,
  banr,
  bani,
  borr,
  bori,
  setr,
  seti,
  gtir,
  gtri,
  gtrr,
  eqri,
  eqir,
  eqrr,
}

const numOps = Object.keys(ops).length

const opMeta = Object.keys(ops).reduce((acc, opKey) => {
  return {
    ...acc,
    [opKey]: {
      fn: ops[opKey],
      correctFor: new Set(),
      incorrectFor: new Set(),
    },
  }
}, {})

// measure what opcodes our ops were correct + incorrect for
for (let i = 0; i < samples.length; i += 3) {
  const [_0, a0, b0, c0, d0] = samples[i].match(beforeAfterRegex).map(Number)
  const [_1, a1, b1, c1, d1] = samples[i + 2]
    .match(beforeAfterRegex)
    .map(Number)
  const [opcode, a, b, r] = samples[i + 1]
    .trim()
    .split(' ')
    .map(Number)

  Object.keys(opMeta).forEach(opKey => {
    const [rA, rB, rC, rD] = ops[opKey]([a0, b0, c0, d0], a, b, r)
    if (rA === a1 && rB === b1 && rC === c1 && rD === d1) {
      opMeta[opKey].correctFor.add(opcode)
    } else {
      opMeta[opKey].incorrectFor.add(opcode)
    }
  })
}

// filter our correctFor sets using our incorrectFor sets
Object.keys(opMeta).forEach(opKey => {
  Array.from(opMeta[opKey].incorrectFor).forEach(incorrectFor => {
    opMeta[opKey].correctFor.delete(incorrectFor)
  })
  delete opMeta[opKey].incorrectFor
})

let opcodes = Array(numOps)

// assume there will always be a way for us to disambiguate
// 1. find the op with only once correct opcode
// 2. remove this opcode from all other ops' correct lists
// 3. cascade until we've resolved all
for (i = 0; i < numOps; i++) {
  const foundOpKey = Object.keys(opMeta).find(
    opKey => opMeta[opKey].correctFor.size === 1
  )
  const foundOpcode = Array.from(opMeta[foundOpKey].correctFor)[0]
  opcodes[foundOpcode] = opMeta[foundOpKey].fn
  Object.keys(opMeta).forEach(ok => {
    opMeta[ok].correctFor.delete(foundOpcode)
  })
}

let initialRegisters = Array(4).fill(0)

// execute all our ops on blank registers
const [a, _b, _c, _d] = input_ops.reduce(
  (regs, op) => opcodes[op[0]](regs, op[1], op[2], op[3]),
  initialRegisters
)

console.log(a)
