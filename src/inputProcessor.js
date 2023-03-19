const readline = require('node:readline/promises')

const inputProcessor = module.exports = {}

inputProcessor.getInput = async () => {
  const input = await inputProcessor.readInputFromTerminal()
  return inputProcessor.getGridAndRobotsFromInput(input)
}

inputProcessor.readInputFromTerminal = async () => {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const input = [await reader.question('Please provide the grid parameters\n')]
  // Ask for input until an empty input is given
  while (input[input.length-1]) {
    input.push(await reader.question(input.length > 1 ? '' : 'Please provide individual robot directions. To end the input, press enter with no input\n'))
  }
  // Remove the empty input from the end of the array
  return input.slice(0, input.length-1)
}

inputProcessor.getGridAndRobotsFromInput = (input) => {
  if (!input || !input.length) {
    throw new Error('Please provide an input')
  }
  if (input.length < 2) {
    throw new Error('Please provide robot instructions')
  }
  const grid = input.shift().split(' ').map(dimension => parseInt(dimension))
  if (grid.length !== 2) {
    throw new Error('Please provide a valid grid input on the first line, taking the format: int int')
  }
  const robots = inputProcessor.getRobotsFromInput(input)
  return { grid, robots }
}

inputProcessor.getRobotsFromInput = (input) => {
  return input.map((robot, i) => {
    const splitRobotInput = robot.split(') ')
    if (splitRobotInput.length !== 2) {
      throw new Error(`Missing position or instructions for robot ${i+1}`)
    }
    const startingPosition = splitRobotInput[0].substring(1).split(', ')
    if (startingPosition.length != 3) {
      throw new Error(`Invalid starting position for robot ${i+1}`)
    }
    startingPosition[0] = parseInt(startingPosition[0])
    startingPosition[1] = parseInt(startingPosition[1])
    const instructions = splitRobotInput[1].split('')
    if (instructions.find(char => !['F', 'R', 'L'].includes(char))) {
      throw new Error(`Invalid instructions for robot ${i+1}`)
    }
    return {
      startingPosition,
      instructions
    }
  })
}
