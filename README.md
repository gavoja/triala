# Triala

A minimal test runner for programmers.
* No globals
* No dependencies.
* Asynchronous tests with ES6 await/async syntax.
* And all less than 50 lines of code!

## Writing tests


```JavaScript
// my-fancy-suite.js

// Because globals are BAD.
const test = require('triala')

// Because there is no point in reinventing the wheel.
const assert = require('assert')

// Let's define our suite.
test('My fancy suite', class {
  // Define some standard hooks.
  async _before { console.log('I will be run before the suite.') }
  async _after { console.log('I will be run after the suite.') }
  async _beforeEach { console.log('I will be run before each test.') }
  async _afterEach () { console.log('I will be run after each test.') }

  // Prefix helper methods with '_'.
  async _delayByOneSecond (callback) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        callback(resolve, reject)
      }, 1000)
    })
  }

  //
  // Define your tests.
  //

  'It should pass' () {
    assert.ok('Passing through')
  }

  async 'It should pass after some time' () {
    await this._delayByOneSecond((resolve, reject) => {
      resolve()
    })
  }

  async 'it should fail after some time' () {
    await this._delayByOneSecond((resolve, reject) => {
      reject(new Error('You shall not pass!'))
    })
  }
})


```

## Running test

Just run the file:
```
node my-fancy-suite.js
```
For verbose mode:
```
node my-fancy-suite.js -v
```
