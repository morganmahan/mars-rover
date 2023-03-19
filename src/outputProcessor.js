const outputProcessor = module.exports = {}

outputProcessor.formatOutput = (output) => {
  return output.map(robot => {
    let stringOutput = '('
    robot.finalPosition.forEach((val, i) => {
      if (i === robot.finalPosition.length - 1) {
        stringOutput = stringOutput + val + ')'
      } else {
        stringOutput = stringOutput + val + ', '
      }
    })
    if (robot.lost) stringOutput = stringOutput + ' LOST'
    return stringOutput
  })
}
