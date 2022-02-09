// Board

export type Piece = "x" | "y"
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
  // return Object.entries(board).reduce(([key, value], accumulator) => {
    // Check all vertical possibilities for the value
    const verticalWin = checkForVerticalWin(board["1"], 1)
    if (verticalWin) {
      return verticalWin
    }
    // return accumulator.push(verticalWin)
  // }, [])
  // position 1, check the vertical
}


//Stopping point
//The board is the one with only one x on it. 
//So we are using the board we altered in move. 
//When we run the test, the board is the one we changed during hte previous 
//test to have one move on it. 
//What we need is the board to be a) passed in as an argument or b) have the 
// board be controlled separately? try both see what fits.

function checkForVerticalWin (symbol: Piece, position: keyof Board) {
  if ([1,4,7].includes(position)) {
    console.log("&&&", board["1"], board["4"], board["7"], board)
    if (board["1"] === symbol && board["4"] === symbol && board["7"] === symbol) {
      // console.log('**checkForVerticalWin**', symbol, position)
      return ["1", "4", "7"]
    }
  }
}