const test = require('./index')
const assert = require('assert')

test('triala', class {
  'it should pass' () {
    assert.ok('Passing through.')
  }

  'it should fail' () {
    assert.fail('You shall not pass!')
  }

  async 'it should pass after some time' () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  async 'it should fail after some time' () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Epic timeout fail!'))
      }, 1000)
    })
  }

  _before () {
    console.log('  before')
  }

  _after () {
    console.log('  after')
  }

  _beforeEach () {
    console.log('  before each')
  }

  _afterEach () {
    console.log('  after each')
  }
})
