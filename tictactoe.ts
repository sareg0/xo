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
type WinStreakType = [keyof Board, keyof Board, keyof Board]

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

export class Game {
  id: string
  board: Board
  winningStreak: null | WinStreakType
  player: Piece
  constructor(id: string, board?: Board, player?: Piece, winningStreak?: WinStreakType) {
    this.board = board || {
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
    this.winningStreak = winningStreak || null
    this.player = player || 'x'
    this.id = id
  }
  addMove (position: keyof Board) {
    if (this.winningStreak) throw Error('game has already been won!!')
    if (this.board[position] !== null) throw Error ('you cannot move to this position, it\'s already taken!')
    if (Object.keys(this.board).includes(position.toString())) {
      this.board[position] = this.player
      const winStreak = win(this.board)
      if (winStreak.length === WIN_LENGTH) {
        this.updateWinningStreak(winStreak)
      } else {
        this.changePlayer()
      }
    } else {
      throw Error('that is an invalid move!!')
    }
  }
  // can this be made private, so that it cannot be called by the instance, 
  // and only inside a method?
  changePlayer () {
    this.player = this.player === 'x' ? 'o' : 'x'
  }
  updateWinningStreak (winStreak: WinStreakType) {
    this.winningStreak = winStreak
  }
}

// // should we always run through the board, to find if there is a win? 
// // are there other ways, to narrow down what to check for a win?
// // What should we do if there is a tie? Should ties be impossible?
// Can you determine a win WITHOUT a list of pre-determined wins?
export function win (board: Board): WinStreakType {


  let win = []
  for (const possibleWin of POSSIBLE_WINS) {
    if (win.length === 3) {
        // How can we avoid using `as`, and make sure the type is inferred through correct assignment?
      return win as WinStreakType
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
      return accumulator
    }, [])
  }
  // How can we avoid using `as`, and make sure the type is inferred through correct assignment?
  return win as WinStreakType
}