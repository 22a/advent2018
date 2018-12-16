const input = '637061'

let rs = '37'

let cia = 0 // current recipe index a
let cib = 1 // current recipe index b // <3 sp7

let done = false

while (!done) {
  const sum = Number(rs[cia]) + Number(rs[cib])
  if (sum >= 10) {
    rs += Math.floor(sum / 10)
  }
  rs += sum % 10

  const indexOfInput = rs.indexOf(input)
  if (indexOfInput !== -1) {
    console.log(indexOfInput)
    done = true
  }

  cia = (cia + Number(rs[cia]) + 1) % rs.length
  cib = (cib + Number(rs[cib]) + 1) % rs.length
}
