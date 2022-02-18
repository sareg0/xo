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

const verticalWinThree: Board = {
  1: "x",
  2: null,
  3: "x",
  4: "x",
  5: "o",
  6: "x",
  7: "o",
  8: "o",
  9: "x",
}

const diagonalWinOne: Board = {
  1: "x",
  2: null,
  3: null,
  4: "x",
  5: "x",
  6: null,
  7: "o",
  8: null,
  9: "x",
}

const diagonalWinTwo: Board = {
  1: "x",
  2: null,
  3: "o",
  4: "x",
  5: "o",
  6: null,
  7: "o",
  8: null,
  9: "x",
}

const horizontalWinOne: Board = {
  1: "o",
  2: "o",
  3: "o",
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
}

const horizontalWinTwo: Board = {
  1: "o",
  2: "o",
  3: null,
  4: "x",
  5: "x",
  6: "x",
  7: null,
  8: null,
  9: null,
}
const horizontalWinThree: Board = {
  1: "o",
  2: "o",
  3: null,
  4: null,
  5: null,
  6: null,
  7: "o",
  8: "o",
  9: "o",
}


test('creates empty board', () => {
  const thing = createBoard()
  expect(thing).toEqual(emptyBoard)
})

describe('addMove', () => {
  it('adds a move to the board', () => {
    const board = createBoard()
    addMove('x', 1, board)
    expect(board).toEqual({
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
    addMove('o', 2, board)
    expect(board).toEqual({
      1: 'x',
      2: 'o',
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
    })
  })
})



describe('checkForWin', () => {
  it('checks for vertical win', () => {
    const winOne = checkForWin(verticalWinOne)
    const winTwo = checkForWin(verticalWinTwo)
    const winThree = checkForWin(verticalWinThree)
  
    expect(winOne).toStrictEqual(["1","4","7"])
    expect(winTwo).toStrictEqual(["2","5","8"])
    expect(winThree).toStrictEqual(["3","6","9"])
  })
  it('checks for diagonal win', () => {
    const winOne = checkForWin(diagonalWinOne)
    const winTwo = checkForWin(diagonalWinTwo)
  
    expect(winOne).toStrictEqual(["1","5","9"])
    expect(winTwo).toStrictEqual(["3","5","7"])
  })
  it('checks for horizontal win', () => {
    const winOne = checkForWin(horizontalWinOne)
    const winTwo = checkForWin(horizontalWinTwo)
    const winThree = checkForWin(horizontalWinThree)
  
    expect(winOne).toStrictEqual(["1","2","3"])
    expect(winTwo).toStrictEqual(["4","5","6"])
    expect(winThree).toStrictEqual(["7","8","9"])
  })
})








//What happens when someone ties?
//Is a tie in noughts and crosses possible?
//Not in a game where the first to get a streak wins

//How might this game work when you want to say, connect any number
//of position on a board of any size?
// e.g. connect four. Could this also be used to do connect 4,
// with some minor changes.

//How might I organise the tests better?