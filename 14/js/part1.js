const input = 637061

const rs = [3, 7]

let cia = 0 // current recipe index a
let cib = 1 // current recipe index b // <3 sp7

while (rs.length < input + 10) {
  const sum = rs[cia] + rs[cib]
  if (sum >= 10) {
    rs.push(Math.floor(sum / 10))
  }
  rs.push(sum % 10)

  cia = (cia + rs[cia] + 1) % rs.length
  cib = (cib + rs[cib] + 1) % rs.length
}

console.log(rs.slice(input).join(''))
