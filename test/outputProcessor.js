const { expect } = require('chai')
const outputProcessor = require('../src/outputProcessor')

describe('OutputProcessor', function () {
  describe('formatOutput', function () {
    it('should take an object containing a position and convert it to a string output', function () {
      const result = outputProcessor.formatOutput([{ finalPosition: [ 4, 4, 'E' ], lost: false }])
      expect(result).to.have.members(['(4, 4, E)'])
    })
    it('should take an object containing a lost robot and convert it to a string output', function () {
      const result = outputProcessor.formatOutput([{ finalPosition: [ 0, 4, 'W' ], lost: true }])
      expect(result).to.have.members(['(0, 4, W) LOST'])
    })
  })
})
