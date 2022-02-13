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

let board: Board = {
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

export function createBoard() {
  return board
}

export function addMove(symbol: Piece, position: keyof Board) {
  board[position] = symbol
  return board
}
 
export function checkForWin(board: Board) {
  const cells = Object.entries(board)
  // check each cell's symbol and position
  // compare cell and symbol with the algorithm for a vertical win
  let win;
  cells.forEach((cell) => {
    if (win) {
      return win
    }
    win = checkForVerticalWin(cell[1], cell[0], board)
  })
  return win
}

// should we always run through the board, to find if there is a win? 
// are there other ways?
function checkForVerticalWin (board: Board) {
  const verticalWins = [
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"]
  ]

  let win = []
  for (const verticalWin of verticalWins) {
    console.log('verticalWin', verticalWin)    
    if (win.length === 3) {
      return win
    }
    win = verticalWin.reduce((accumulator, currentValue, currentIndex, array) => {

      if (board[`${currentValue}`] === null) {
        accumulator = []
      } else {
        // there is a symbol at the cell
        if (currentIndex === 0) {
          accumulator.push(currentValue)
        } else {
          // If the current cell is the same as the symbol at the last cell
          console.log(board[`${currentValue}`], board[`${array[currentIndex-1]}`])
          if (board[`${currentValue}`] === board[`${array[currentIndex-1]}`]) {
            // push is a mutator. You will mutate the accumulator here, so 
            // you won't have it as it was before. Consider what other possibilities there
            // are
            accumulator.push(currentValue)
          } else {
            accumulator = []
          }
        }
      }
      console.log('acc', accumulator)
      return accumulator
    }, [])
  }
  return win
}