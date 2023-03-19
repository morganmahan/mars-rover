const { expect } = require('chai')
const inputProcessor = require('../src/inputProcessor')

describe('InputProcessor', function () {
  describe('getGridAndRobotsFromInput', function () {
    it('should get grid and robots from the given input', function () {
      const result = inputProcessor.getGridAndRobotsFromInput([
        '4 8',
        '(2, 3, E) LFRFF',
        '(0, 2, N) FFLFRFF'
      ])
      expect(result).to.deep.equal({
        grid: [4, 8],
        robots: [
          {
            startingPosition: [2, 3, 'E'],
            instructions: ['L', 'F', 'R', 'F', 'F']
          },
          {
            startingPosition: [0, 2, 'N'],
            instructions: ['F', 'F', 'L', 'F', 'R', 'F', 'F']
          }
        ]
      })
    })
    it('should throw an error on empty array', function () {
      expect(() => inputProcessor.getGridAndRobotsFromInput([])).throw('Please provide an input')
    })
    it('should throw an error when providing just the grid', function () {
      expect(() => inputProcessor.getGridAndRobotsFromInput(['4 8'])).throw('Please provide robot instructions')
    })
    it('should throw an error when too many parameters are passed as the grid', function () {
      expect(() => inputProcessor.getGridAndRobotsFromInput(['4 8 9', ''])).throw('Please provide a valid grid input on the first line, taking the format: int int')
    })
    it('should throw an error when too little parameters are passed as the grid', function () {
      expect(() => inputProcessor.getGridAndRobotsFromInput(['4', ''])).throw('Please provide a valid grid input on the first line, taking the format: int int')
    })
  })
  describe('getRobotsFromInput', function () {
    it('should get the robots starting position and instructions', function () {
      const result = inputProcessor.getRobotsFromInput([
        '(2, 3, E) LFRFF',
        '(0, 2, N) FFLFRFF'
      ])
      expect(result).to.have.deep.members([
        {
          startingPosition: [2, 3, 'E'],
          instructions: ['L', 'F', 'R', 'F', 'F']
        },
        {
          startingPosition: [0, 2, 'N'],
          instructions: ['F', 'F', 'L', 'F', 'R', 'F', 'F']
        }
      ])
    })
    it('should throw an error if robots dont have a starting position', function () {
      expect(() => inputProcessor.getRobotsFromInput(['(2, 3, E)'])).throw('Missing position or instructions for robot 1')
    })
    it('should throw an error if robots dont have instructions', function () {
      expect(() => inputProcessor.getRobotsFromInput(['FFLFRFF'])).throw('Missing position or instructions for robot 1')
    })
    it('should throw an error if the given starting position does not consist of 3 inputs', function () {
      expect(() => inputProcessor.getRobotsFromInput(['(2, 3) FFLFF'])).throw('Invalid starting position for robot 1')
    })
    it('should throw an error if the given instructions contain any characters other than F, L, R', function () {
      expect(() => inputProcessor.getRobotsFromInput(['(2, 3, E) LRFPLRF'])).throw('Invalid instructions for robot 1')
    })
  })
})
