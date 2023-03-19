# Mars Rover

A program that moves robots around a given grid, representing Mars, based on given movements.

## Installation

For running this app, you will need Node and NPM installed, instructions for which are linked [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Installing dependencies

The app requires some dependencies to run the tests. Install these dependencies with `npm install`.

## Usage

### Running

To run this app, run `npm start`.

### Providing instructions

To provide the instructions, you have to first provide the grid size, in the format: 
```
int int
```
where the first int is the x axis and the second, the y axis.
Then, line by line, provide instructions for individual robots, in the format:
```
(int, int, char) instructions
```
where the first two ints are the x and y starting position, the char is a direction for the robot to be facing initially, either N, S, E or W, and instructions is multiple unseparated chars, either F, L or R, instructing the robot whether to move forward, or to turn left or right.

A future improvement, as mentioned in [improvements](#improvements), would be to accept a full, multi line input, containing the grid and all robots as one input.

### Testing

To run automated tests, run `npm test`.

## Improvements

- Improve the input validation to reject non-integer values in the grid input, ensure the robot starting positions always have the types int, int, string etc.

- Improve the terminal interface, allowing it to take a multi line input. e.g. pasting the following as one input, rather than as individual lines
  ```
  4 8
  (2, 3, E) LFRFF
  (0, 2, N) FFLFRFF
  ```
  This proved quite tricky to do in JavaScript, and I felt my time was better spent improving other areas of this app.
  In a production environment, this app would likely accept a JSON object in a request, which would be an object containing a grid property, with an array of robots and their starting positions and instructions.

- Add tests for the `readInputFromTerminal` function in the inputProcessor, testing that the function stops retrieving input when an empty input is given, and ensuring it then removes that empty input from the array of inputs. This function would have required stubs for the input reader, and npm seemed to have some issues installing Sinon, my preferred stubbing/mocking package.
