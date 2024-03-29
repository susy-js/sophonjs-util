var assert = require('assert')
var sofUtil = require('../dist/index.js')

describe('define', function () {
  const fields = [{
    name: 'aword',
    alias: 'blah',
    word: true,
    default: Buffer.allocUnsafe(0)
  }, {
    name: 'empty',
    allowZero: true,
    length: 20,
    default: Buffer.allocUnsafe(0)
  }, {
    name: 'cannotBeZero',
    allowZero: false,
    default: Buffer.from([0])
  }, {
    name: 'value',
    default: Buffer.allocUnsafe(0)
  }, {
    name: 'r',
    length: 32,
    allowLess: true,
    default: sofUtil.zeros(32)
  }]

  it('should trim zeros', function () {
    var someOb = {}
    sofUtil.defineProperties(someOb, fields)
    // Define Properties
    someOb.r = '0x00004'
    assert.equal(someOb.r.toString('hex'), '04')

    someOb.r = Buffer.from([0, 0, 0, 0, 4])
    assert.equal(someOb.r.toString('hex'), '04')
  })

  it('shouldn\'t allow wrong size for exact size requirements', function () {
    var someOb = {}
    sofUtil.defineProperties(someOb, fields)

    assert.throws(function () {
      const tmp = [{
        name: 'mustBeExactSize',
        allowZero: false,
        length: 20,
        default: Buffer.from([1, 2, 3, 4])
      }]
      sofUtil.defineProperties(someOb, tmp)
    })
  })

  it('it should accept srlp encoded intial data', function () {
    var someOb = {}
    var data = {
      aword: 'test',
      cannotBeZero: 'not zero',
      value: 'a value',
      r: 'rrr'
    }

    var expected = {
      aword: '0x74657374',
      empty: '0x',
      cannotBeZero: '0x6e6f74207a65726f',
      value: '0x612076616c7565',
      r: '0x727272'
    }

    var expectedArray = [
      '0x74657374', '0x', '0x6e6f74207a65726f', '0x612076616c7565', '0x727272'
    ]

    sofUtil.defineProperties(someOb, fields, data)
    assert.deepEqual(someOb.toJSON(true), expected, 'should produce the correctly labeled object')

    var someOb2 = {}
    var srlpEncoded = someOb.serialize().toString('hex')
    sofUtil.defineProperties(someOb2, fields, srlpEncoded)
    assert.equal(someOb2.serialize().toString('hex'), srlpEncoded, 'the constuctor should accept srlp encoded buffers')

    var someOb3 = {}
    sofUtil.defineProperties(someOb3, fields, expectedArray)
    assert.deepEqual(someOb.toJSON(), expectedArray, 'should produce the correctly object')
  })

  it('it should not accept invalid values in the constuctor', function () {
    var someOb = {}
    assert.throws(function () {
      sofUtil.defineProperties(someOb, fields, 5)
    }, 'should throw on nonsensical data')

    assert.throws(function () {
      sofUtil.defineProperties(someOb, fields, Array(6))
    }, 'should throw on invalid arrays')
  })

  it('alias should work ', function () {
    var someOb = {}
    var data = {
      aword: 'test',
      cannotBeZero: 'not zero',
      value: 'a value',
      r: 'rrr'
    }

    sofUtil.defineProperties(someOb, fields, data)
    assert.equal(someOb.blah.toString(), 'test')
    someOb.blah = 'lol'
    assert.equal(someOb.blah.toString(), 'lol')
    assert.equal(someOb.aword.toString(), 'lol')
  })

  it('alias should work #2', function () {
    var someOb = {}
    var data = { blah: '42' }

    sofUtil.defineProperties(someOb, fields, data)
    assert.equal(someOb.blah, '42')
    assert.equal(someOb.aword, '42')
  })
})
