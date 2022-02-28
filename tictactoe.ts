// Board

export type Piece = "x" | "o"
export type Board = {
  1: null | Piece,
  2: null | Piece,
  3: null | Piece,
  4: null | Piece,
  5: null | Piece,
  6: null | Piece,
  7: null | Piece,
  8: null | Piece,
  9: null | Piece,
}

const POSSIBLE_WINS = [
  ["1", "2", "3"], //H
  ["1", "4", "7"], //V
  ["1", "5", "9"], //D
  ["2", "5", "8"], //V
  ["3", "6", "9"], //v
  ["3", "5", "7"], //D
  ["4", "5", "6"], //H
  ["7", "8", "9"], //H
]

const WIN_LENGTH = 3

// type GameType = {
//   boardFunctions: Function
//   board: Board
//   winningStreak: [keyof Board, keyof Board, keyof Board] //string of the keys of board
//   addMove: Function
// }
// TODO: how does one type the game? So far, adding GameType is not helpful
export function newGame() {
  const game = Object.create(boardFunctions)
  game.board = {
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
  game.winningStreak = null
  // Enforce whose turn it is; noughts or crosses
  // game.turn = null
  return game
}

const boardFunctions = {
  addMove: function(symbol: Piece, position: keyof Board) {
    if (this.winningStreak) throw Error('game has already been won!!')
    if (Object.keys(this.board).includes(position.toString()) && ['x', 'o'].includes(symbol)) {
      this.board[position] = symbol
      const winStreak = win(this.board)
      if (winStreak.length === WIN_LENGTH) {
        this.winningStreak = winStreak
      }
    } else {
      throw Error('that is an invalid move!!')
    }
  },
} 

// // should we always run through the board, to find if there is a win? 
// // are there other ways, to narrow down what to check for a win?
// // What should we do if there is a tie? Should ties be impossible?
// Can you determine a win WITHOUT a list of pre-determined wins?
export function win (board: Board) {


  let win = []
  for (const possibleWin of POSSIBLE_WINS) {
    if (win.length === 3) {
      return win
    }
    win = possibleWin.reduce((accumulator, currentValue, currentIndex, array) => {
      if (board[`${currentValue}`] === null) {
        // When there is no value in the cell, reset the streak of moves.
        // Possible improvement: only zero out the streak if there is a streak length
        accumulator = []
      } else {
        if (currentIndex === 0) {
          // If there is a symbol in the cell and it's the first position of our possible Win
          // use it to start the streak
          accumulator.push(currentValue)
        } else {
          // If the symbol of the current position is the same as the symbol at the last cell
          // of our possilbe win, it's a streak, so add it to the streak
          console.log(board[`${currentValue}`], board[`${array[currentIndex-1]}`])
          if (board[`${currentValue}`] === board[`${array[currentIndex-1]}`]) {
            // Hint: push is a mutator. You will mutate the accumulator here, so 
            // you won't have it as it was before. Consider what other possibilities there
            // are for returning a new value
            accumulator.push(currentValue)
          } else {
            // If the symbol in the current and last position of the possible win are not
            // the same, the streak is broken. 0 it out!
            accumulator = []
          }
        }
      }
      console.log('acc', accumulator)
      return accumulator
    }, [])
  }
  console.log('win', win)
  return win
}