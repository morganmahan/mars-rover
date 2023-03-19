const { expect } = require('chai')
const robotController = require('../src/robot')

describe('Robot', function () {
  describe('moveWithInstructions', function () {
    it('should return the correct final position based on the given starting position and movement instructions', function () {
      const result = robotController.moveWithInstructions([2, 3, 'E'], ['L', 'F', 'R', 'F', 'F'], [4, 8])
      expect(result).to.deep.equal({
        finalPosition: [4, 4, 'E'],
        lost: false
      })
    })
    it('should return the final position of a lost robot as its last position before it was lost', function () {
      const result = robotController.moveWithInstructions([0, 2, 'N'], ['F', 'F', 'L', 'F', 'R', 'F', 'F'], [4, 8])
      expect(result).to.deep.equal({
        finalPosition: [0, 4, 'W'],
        lost: true
      })
    })
  })
  describe('moveForward', function () {
    it('should return null if a move will move the robot outside the grid', function () {
      const result = robotController.moveForward([2, 2], 'E', [2, 2])
      expect(result).to.be.null
    })
  })
})
