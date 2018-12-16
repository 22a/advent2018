const fs = require('fs')

const contents = fs.readFileSync('../input_1.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

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

const ops = [
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
]

let answer = 0

for (let i = 0; i < lines.length; i += 3) {
  const [_0, a0, b0, c0, d0] = lines[i].match(beforeAfterRegex).map(Number)
  const [_1, a1, b1, c1, d1] = lines[i + 2].match(beforeAfterRegex).map(Number)
  const [opcode, a, b, r] = lines[i + 1]
    .trim()
    .split(' ')
    .map(Number)

  let outputMatchesOpOutput = 0

  ops.forEach(op => {
    const [rA, rB, rC, rD] = op([a0, b0, c0, d0], a, b, r)
    if (rA === a1 && rB === b1 && rC === c1 && rD === d1) {
      outputMatchesOpOutput++
    }
  })

  if (outputMatchesOpOutput >= 3) {
    answer++
  }
}

console.log(answer)
