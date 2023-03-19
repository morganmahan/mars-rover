const inputProcessor = require('./inputProcessor')
const outputProcessor = require('./outputProcessor')
const robotController = require('./robot')
const marsRoverInstructor = module.exports = {}

marsRoverInstructor.getAndExecuteInstructions = async () => {
  try {
    const { grid, robots } = await inputProcessor.getInput()
    const robotFinalPositions = robotController.moveMultipleWithInstructions(robots, grid)
    const response = outputProcessor.formatOutput(robotFinalPositions)
    response.forEach(robot => {
      console.log(robot)
    })
  } catch (err) {
    console.log('Error: ', err.message)
  }
}

marsRoverInstructor.getAndExecuteInstructions().then(() => process.exit())
