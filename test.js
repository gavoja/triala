import test from './index.js'
import assert from 'assert'

test('triala', class {
  async _timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  'It should pass' () {
    assert.ok('Passing through.')
  }

  'It should fail' () {
    assert.fail('You shall not pass!')
  }

  async 'It should pass after some time' () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  async 'It should fail after some time' () {
    await this._timeout(1000)
    new Error('Epic timeout fail!')
  }

  'm It is muted' () {
    assert.fail('I cannot speak.')
  }

  _before () {
    console.log('  Before')
  }

  _after () {
    console.log('  After')
  }

  _beforeEach () {
    console.log('  Before each')
  }

  _afterEach () {
    console.log('  After each')
  }
})
