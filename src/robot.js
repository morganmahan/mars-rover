const robot = module.exports = {}

robot.moveMultipleWithInstructions = (robots, grid) => {
  return robots.map(({startingPosition, instructions}) => {
    return robot.moveWithInstructions(startingPosition, instructions, grid)
  })
}

robot.moveWithInstructions = (startingPosition, instructions, grid) => {
  let currentDirection = startingPosition[2]
  let currentPosition = [startingPosition[0], startingPosition[1]]
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i]
    if (instruction === 'F') {
      const nextPosition = robot.moveForward(currentPosition, currentDirection, grid)
      if (!nextPosition) return robot.createResponse(currentPosition, currentDirection, true)
      currentPosition = nextPosition
    } else if (instruction === 'L') {
      currentDirection = robot.turnLeft(currentDirection)
    } else if (instruction === 'R') {
      currentDirection = robot.turnRight(currentDirection)
    }
  }
  return robot.createResponse(currentPosition, currentDirection, false)
}

robot.moveForward = (currentPosition, currentDirection, grid) => {
  let nextPosition = [ ...currentPosition ]
  switch (currentDirection) {
    case 'N': 
      nextPosition[1]++
      break
    case 'E': 
      nextPosition[0]++
      break
    case 'S': 
      nextPosition[1]--
      break
    case 'W': 
      nextPosition[0]--
      break
  }
  const isLostOnNextPosition = nextPosition[0] > grid[0] || nextPosition[0] < 0 ||
    nextPosition[1] > grid[1] || nextPosition[1] < 0
  if (isLostOnNextPosition) return null
  return nextPosition
}

robot.turnLeft = (currentDirection) => {
  switch (currentDirection) {
    case 'N': return 'W'
    case 'E': return 'N'
    case 'S': return 'E'
    case 'W': return 'S'
  }
  return currentDirection
}

robot.turnRight = (currentDirection) => {
  switch (currentDirection) {
    case 'N': return 'E'
    case 'E': return 'S'
    case 'S': return 'W'
    case 'W': return 'N'
  }
  return currentDirection
}

robot.createResponse = (currentPosition, currentDirection, lost) => {
  return { finalPosition: [...currentPosition, currentDirection], lost }
}
