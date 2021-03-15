'use strict'

const RED = '\x1b[31m%s\x1b[0m'
const GREEN = '\x1b[32m%s\x1b[0m'

async function test (name, Suite) {
  const verbose = process.argv.length === 3 && process.argv[2] === '-v'

  const suite = new Suite()
  const count = { total: 0, failures: 0 }
  const names = Object.getOwnPropertyNames(Object.getPrototypeOf(suite))
  const hasSolos = names.some(n => n.toLowerCase().startsWith('s '))

  suite._before && await suite._before()

  for (const name of names) {
    const isSpecial = name === 'constructor' || name.startsWith('_')
    const isMuted = name.toLowerCase().startsWith('m ') || (hasSolos && !name.toLowerCase().startsWith('s '))

    if (!isSpecial && !isMuted) {
      count.total += 1
      suite._beforeEach && await suite._beforeEach()
      try {
        await suite[name]()
        verbose && console.log(GREEN, `> ${name}`)
      } catch (err) {
        console.log(RED, `> ${name}: ${err.message}`)
        console.error('  ' + err.stack)
        count.failures += 1
      }
      suite._afterEach && await suite._afterEach()
    }
  }

  suite._after && await suite._after()

  console.log(count.failures ? RED : GREEN, `\n${name}: passed ${count.total - count.failures} of ${count.total}`)
  process.exitCode = count.failures === 0 ? 0 : 1
}

export default test
