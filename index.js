'use strict'

const RED = '\x1b[31m%s\x1b[0m'
const GREEN = '\x1b[32m%s\x1b[0m'

async function run (name, Test) {
  const verbose = process.argv.length === 3 && process.argv[2] === '-v'

  const test = new Test()
  const count = { total: 0, failures: 0 }

  test._before && await test._before()

  for (let name of Object.getOwnPropertyNames(Object.getPrototypeOf(test))) {
    if (name !== 'constructor' && !name.startsWith('_')) {
      count.total += 1

      test._beforeEach && await test._beforeEach()
      try {
        await test[name]()
        verbose && console.log(GREEN, `> ${name}`)
      } catch (err) {
        console.log(RED, `> ${name}: ${err.message}`)
        console.error('  ' + err.stack)
        count.failures += 1
      }
      test._afterEach && await test._afterEach()
    }
  }

  test._after && await test._after()

  console.log(count.failures ? RED : GREEN, `\n${name}: passed ${count.total - count.failures} of ${count.total}`)
  process.exit(count.failures === 0 ? 0 : 1)
}

module.exports = run
