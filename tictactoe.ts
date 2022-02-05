// Board

type Piece = "x" | "y"
type Board = {
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
  board["1"] = 'x'
  return board
}