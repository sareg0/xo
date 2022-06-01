export type Piece = "x" | "o"

export interface BoardInterface {
  [key: number]: Piece | null;
}

type WinType = [keyof BoardInterface, keyof BoardInterface, keyof BoardInterface]

const POSSIBLE_WINS: [string, string, string][] = [
  ['1', '2', '3'], //H
  ['1', '4', '7'], //V
  ['1', '5', '9'], //D
  ['2', '5', '8'], //V
  ['3', '6', '9'], //v
  ['3', '5', '7'], //D
  ['4', '5', '6'], //H
  ['7', '8', '9'], //H
]

const WIN_LENGTH = 3

export class Game {
  id: string
  board: BoardInterface
  winningStreak: null | WinType
  player: Piece
  constructor(id: string, board?: BoardInterface, player?: Piece, winningStreak?: WinType) {
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
  addMove(position: keyof BoardInterface) {
    if (this.winningStreak) throw Error('game has already been won!!')
    if (this.board[position] !== null) throw Error('you cannot move to this position, it\'s already taken!')
    if (Object.keys(this.board).includes(position.toString())) {
      this.board[position] = this.player
      const winStreak = winCollector(this.board)
      if (winStreak.length === WIN_LENGTH) {
        this.updateWinningStreak(winStreak as unknown as WinType)
      } else {
        this.changePlayer()
      }
    } else {
      throw Error('that is an invalid move!!')
    }
  }
  // TODO: make changePlayer private
  changePlayer() {
    this.player = this.player === 'x' ? 'o' : 'x'
  }
  // TODO: make updateWinningStreak private
  updateWinningStreak(winStreak: WinType) {
    this.winningStreak = winStreak
  }
}

// go to each item on the board
// if it is null leave it
// if it is filled iwth a position then save it
export const filterFilledPositions = (board: BoardInterface) => {
  return Object.keys(board).reduce((previousValue: any[], currentValue: string) => {
    if (board[currentValue as unknown as number] !== null) {
      return [...previousValue, currentValue]
    }  else {
      return previousValue
    }
  }, [])
}

export const winCollector = (board: BoardInterface) => {
  const filteredPostions = filterFilledPositions(board)
  // for each position in filtered positions
  let winStreak: any = []
  for (const position of filteredPostions) {
    // get the possible wins
    const winsForPosition =  filterWinsBy(position)
    // for each possible win
    const piece = board[position as unknown as number]
    for (const win of winsForPosition) {
      // if we got a full win, keep returning
      // can we break?
      if (winStreak.length === win.length) {
        return winStreak
      } else {
        // if we didn't get a streak for the last win, then reset
        winStreak = []
      }

      for (const p of win) {
        if (board[p as unknown as number] === piece) {
          winStreak.push(p)
        } else {
          winStreak = []
        }
      }
    }
  }
  return winStreak
}

// 1 => [[1, 4, 7], [1,2,3] ]
// 1 => symbol is x
// yes? then it's a win!
// no? then it's not a win
// check the position on the board

// check what possible wins there are for this position onthe board
export const filterWinsBy = (boardPosition: string) => {
  return POSSIBLE_WINS.filter((pw) => pw.includes(boardPosition))
}