import {createBoard, addMove, checkForWin, Piece, Board} from './tictactoe'
 
const emptyBoard: Board = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
}

const verticalWinOne: Board = {
  1: "x",
  2: null,
  3: null,
  4: "x",
  5: null,
  6: null,
  7: "x",
  8: null,
  9: null,
}
const verticalWinTwo: Board = {
  1: "x",
  2: "o",
  3: null,
  4: "x",
  5: "o",
  6: null,
  7: null,
  8: "o",
  9: null,
}

// const horizontalWin = {
//   1: "o",
//   2: "o",
//   3: "o",
//   4: null,
//   5: null,
//   6: null,
//   7: null,
//   8: null,
//   9: null,
// }

// const diagonalWin = {
//   1: null,
//   2: null,
//   3: "o",
//   4: null,
//   5: "o",
//   6: null,
//   7: "o",
//   8: null,
//   9: null,
// }



test('creates empty board', () => {
  const thing = createBoard()
  expect(thing).toEqual(emptyBoard)
})

test('makes a move', () => {
  const thing = addMove('x', 1)
  expect(thing).toEqual({
    1: 'x',
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  })
})

test('checks for win', () => {
  const winOne = checkForWin(verticalWinOne)
  const winTwo = checkForWin(verticalWinTwo)
  // winning symbol
  // type of win
  // winning positions
  expect(winOne).toStrictEqual(["1","4","7"])
  expect(winTwo).toStrictEqual(["2","5","8"])
})

