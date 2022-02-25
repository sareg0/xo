import {newGame, Board} from './tictactoe'
 
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

// const verticalWinOne: Board = {
//   1: "x",
//   2: null,
//   3: null,
//   4: "x",
//   5: null,
//   6: null,
//   7: "x",
//   8: null,
//   9: null,
// }
// const verticalWinTwo: Board = {
//   1: "x",
//   2: "o",
//   3: null,
//   4: "x",
//   5: "o",
//   6: null,
//   7: null,
//   8: "o",
//   9: null,
// }

// const verticalWinThree: Board = {
//   1: "x",
//   2: null,
//   3: "x",
//   4: "x",
//   5: "o",
//   6: "x",
//   7: "o",
//   8: "o",
//   9: "x",
// }

// const diagonalWinOne: Board = {
//   1: "x",
//   2: null,
//   3: null,
//   4: "x",
//   5: "x",
//   6: null,
//   7: "o",
//   8: null,
//   9: "x",
// }

// const diagonalWinTwo: Board = {
//   1: "x",
//   2: null,
//   3: "o",
//   4: "x",
//   5: "o",
//   6: null,
//   7: "o",
//   8: null,
//   9: "x",
// }

// const horizontalWinOne: Board = {
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

// const horizontalWinTwo: Board = {
//   1: "o",
//   2: "o",
//   3: null,
//   4: "x",
//   5: "x",
//   6: "x",
//   7: null,
//   8: null,
//   9: null,
// }
// const horizontalWinThree: Board = {
//   1: "o",
//   2: "o",
//   3: null,
//   4: null,
//   5: null,
//   6: null,
//   7: "o",
//   8: "o",
//   9: "o",
// }

describe('newGame', () => {
  test('it can create multiple new games', () => {
    const gameOne = newGame()
    const gameTwo = newGame()
    expect(gameOne.board === gameTwo.board).toBe(false)
    expect(gameOne.board).toEqual(emptyBoard)
    expect(gameTwo.board).toEqual(emptyBoard)
  })

  describe('addMove', () => {
    test('it can make a move to valid positions', () => {
      const gameOne = newGame()
      const gameTwo = newGame()
      gameOne.addMove('x', 3)
      expect(gameOne.board).toEqual({
        1: null,
        2: null,
        3: "x",
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
      })
  
      gameTwo.addMove('x', 8)
      expect(gameTwo.board).toEqual({
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: "x",
        9: null,
      })
    })
    test('it cannot make a move to an invalid position', () => {
      const gameOne = newGame()
      expect(() => gameOne.addMove('x', 15)).toThrow()
      expect(gameOne.board).toEqual(emptyBoard)
    })
    test('it cannot make a move with an invalid piece', () => {
      const gameOne = newGame()
      expect(() => gameOne.addMove('*', 3)).toThrow()
      expect(gameOne.board).toEqual(emptyBoard)
    })
  })
})


// describe('checkForWin', () => {
//   it('checks for vertical win', () => {
//     const winOne = checkForWin(verticalWinOne)
//     const winTwo = checkForWin(verticalWinTwo)
//     const winThree = checkForWin(verticalWinThree)
  
//     expect(winOne).toStrictEqual(["1","4","7"])
//     expect(winTwo).toStrictEqual(["2","5","8"])
//     expect(winThree).toStrictEqual(["3","6","9"])
//   })
//   it('checks for diagonal win', () => {
//     const winOne = checkForWin(diagonalWinOne)
//     const winTwo = checkForWin(diagonalWinTwo)
  
//     expect(winOne).toStrictEqual(["1","5","9"])
//     expect(winTwo).toStrictEqual(["3","5","7"])
//   })
//   it('checks for horizontal win', () => {
//     const winOne = checkForWin(horizontalWinOne)
//     const winTwo = checkForWin(horizontalWinTwo)
//     const winThree = checkForWin(horizontalWinThree)
  
//     expect(winOne).toStrictEqual(["1","2","3"])
//     expect(winTwo).toStrictEqual(["4","5","6"])
//     expect(winThree).toStrictEqual(["7","8","9"])
//   })
// })






// //How might I organise the tests better?
// //How might I test for the mistakes I have made?