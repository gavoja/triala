# Triala

A minimal test runner for programmers.
* No globals.
* No dependencies.
* Asynchronous tests with ES6 await/async syntax.
* Test cases are run sequentially in order.
* And all that in less than 50 lines of code!

## Writing tests


```JavaScript
// my-fancy-suite.js

// Because globals are BAD.
import test from 'triala'

// Because there is no point in reinventing the wheel.
import assert from 'assert'

// Define your suite.
test('My fancy suite', class {
  // Define some standard hooks.
  async _before { console.log('I will be run before the suite.') }
  async _after { console.log('I will be run after the suite.') }
  async _beforeEach { console.log('I will be run before each test.') }
  async _afterEach () { console.log('I will be run after each test.') }

  // Prefix helper methods with '_'.
  async _timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //
  // Define your tests.
  //

  'It should pass' () {
    assert.ok('Passing through')
  }

  'It should throw error' () {
    throw new Error('You shall not pass!')
  }

  async 'It should pass after some time' () {
    await this._timeout(1000)
    assert.ok('Passing through')
  }

  async 'It should fail after some time' () {
    await this._timeout(1000)
    assert.fail('You shall not pass!')
  }

  // Prefix with 'm ' (mute) to disable a test.
  // Prefix with 's ' (solo) to diable all other tests.
  // Prefixes are case insensitive. Multiple solos are supported.
  'm It will not be run' () {
    assert.fail('Does not matter.')
  }
})

```

## Running tests

Just run the file:
```
node my-fancy-suite.js
```
For verbose mode:
```
node my-fancy-suite.js -v
```
