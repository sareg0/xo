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
function checkForVerticalWin (symbol: Piece, position: string, board: Board) {
  const verticalWins = [
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"]
  ]

  let win

  verticalWins.forEach((verticalWin) => {
    if (win) {
      return
    }
    if (verticalWin.includes(position)) {
      console.log(`yes position ${position} is in ${verticalWin}. let's see if it has a full win`)
      win = verticalWin.map((pos) => {
        console.log(`position ${pos} on the board is value: ${board[`${pos}`]}`)
        if (board[`${pos}`] === symbol) {
          console.log(`add ${pos} to the win`)
          //then look at the next two
          return pos
          // return ["1", "4", "7"]
        }
      })
    }
  })
  return win
  // if (["1","4","7"].includes(position)) {
  //   console.log('yes it is in 1,4,7')
  //   console.log('what is there', board["1"], board["4"], board["7"])
  //   if (board["1"] === symbol && board["4"] === symbol && board["7"] === symbol) {
  //     return ["1", "4", "7"]
  //   }
  // }
  // if (["2","5","8"].includes(position)) {
  //   console.log('yes it is in 2,5,8')
  //   console.log('what is there', board["2"], board["5"], board["8"])
  //   if (board["2"] === symbol && board["5"] === symbol && board["8"] === symbol) {
  //     return ["2", "5", "8"]
  //   }
  // }
}