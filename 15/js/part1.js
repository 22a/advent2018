const fs = require('fs')
// const child_process = require('child_process')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')
