const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const sortedLines = lines.sort()

const sleepUpdates = sortedLines.map(line => {
  const firstUniqueChar = line[19]
  const minute = Number(line[15] + line[16])

  switch (firstUniqueChar) {
    case 'G':
      const guardId = Number(line.split('#')[1].split(' ')[0])
      return {
        type: 'rotate',
        guardId,
      }
    case 'f':
      return {
        type: 'sleep',
        minute,
      }
    case 'w':
      return {
        type: 'wake',
        minute,
      }
    default:
      throw new Error(`I have no idea how to parse: (${line})`)
  }
})

const sleepData = sleepUpdates.reduce((acc, update) => {
    switch (update.type) {
      case 'rotate':
        acc.activeGuardId = update.guardId
        acc.guardHasBeenSleepingSince = null
        if (!acc.guardMinuteHistory[update.guardId]) {
          acc.guardMinuteHistory[update.guardId] = new Array(60).fill(0)
        }
        break
      case 'sleep':
        acc.guardHasBeenSleepingSince = update.minute
        break
      case 'wake':
        let napStart = acc.guardHasBeenSleepingSince
        let napEnd = update.minute - 1

        for (let i = napStart; i <= napEnd; i++) {
          acc.guardMinuteHistory[acc.activeGuardId][i]++
        }
        acc.guardHasBeenSleepingSince = null

        break
    }
    return acc
  },
  {
    guardMinuteHistory: {},
    activeGuardId: null,
    guardHasBeenSleepingSince: null
  }
)

const refinedSleepData = {
  minutes: sleepData.guardMinuteHistory,
  sleepTotals: Object.keys(sleepData.guardMinuteHistory).reduce((acc, guardId) => ({
    ...acc,
    [guardId]: sleepData.guardMinuteHistory[guardId].reduce((a, b) => a + b, 0),
  }), {})
}

const guardIds = Object.keys(refinedSleepData.sleepTotals)

const sleepiestGuard = guardIds.reduce((highestSoFar, guardId) =>
  refinedSleepData.sleepTotals[guardId] >
  refinedSleepData.sleepTotals[highestSoFar]
    ? guardId
    : highestSoFar
, guardIds[0])

const timeSleptOnMostSleptMinute = Math.max(...refinedSleepData.minutes[sleepiestGuard])
const sleepiestMinute = refinedSleepData.minutes[sleepiestGuard].indexOf(timeSleptOnMostSleptMinute)

console.log(Number(sleepiestGuard) * sleepiestMinute)
