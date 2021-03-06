import { Game, BoardInterface, filterWinsBy, filterFilledPositions, winCollector } from './tictactoe'

const emptyBoard: BoardInterface = {
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

const verticalWinOne: BoardInterface = {
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
const verticalWinTwo: BoardInterface = {
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

const verticalWinThree: BoardInterface = {
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

const diagonalWinOne: BoardInterface = {
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

const diagonalWinTwo: BoardInterface = {
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

const horizontalWinOne: BoardInterface = {
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

const horizontalWinTwo: BoardInterface = {
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
const horizontalWinThree: BoardInterface = {
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



describe('new Game', () => {
  const gameOne = new Game("1")
  const gameTwo = new Game("2")

  test('it can create new game instances', () => {
    expect(gameOne.board === gameTwo.board).toBe(false)
    expect(gameOne.board).toEqual(emptyBoard)
    expect(gameTwo.board).toEqual(emptyBoard)
  })

  test('it can start a game with a player', () => {
    expect(gameOne.player).toBe('x')
    expect(gameTwo.player).toBe('x')
  })

  test('it can represent a game in play', () => {
  // TODO: figure out if named parameters are possible, for creating the game
    const exisitingGame = new Game("1",verticalWinOne, 'x', [1,4,7])
    expect(exisitingGame.board).toEqual(verticalWinOne)
    expect(exisitingGame.winningStreak).toEqual([1,4,7])
    expect(exisitingGame.player).toEqual("x")
  })

  describe('addMove', () => {
    test('it can make a move to valid positions', () => {
      gameOne.addMove(3)
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

      gameTwo.addMove(8)
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

    test('it changes the player', () => {
      const freshGame = new Game('fresh')

      expect(freshGame.player).toBe('x') 
      freshGame.addMove(3)
      expect(freshGame.player).toBe('o') 
      freshGame.addMove(4)
      expect(freshGame.player).toBe('x') 
    })

    test('it does not allow moving to a space that is already taken', () => {
      const gameOne = new Game("4")
      gameOne.addMove(3)
      expect(() => gameOne.addMove(3)).toThrow()
    })

    test('it updates the winningStreak of the game', () => {
      const gameOne = new Game("5")
      gameOne.addMove(1)
      expect(gameOne.winningStreak).toBeNull()
      gameOne.addMove(4)
      expect(gameOne.winningStreak).toBeNull()
      gameOne.addMove(2)
      expect(gameOne.winningStreak).toBeNull()
      gameOne.addMove(5)
      expect(gameOne.winningStreak).toBeNull()
      gameOne.addMove(3)
      expect(gameOne.winningStreak).toEqual(["1", "2", "3"])
    })

    test('it throws an Error if the game is already won', () => {
      const gameOne = new Game("6")
      expect(gameOne.winningStreak).toBeNull()
      gameOne.addMove(1)
      gameOne.addMove(4)
      gameOne.addMove(2)
      gameOne.addMove(5)
      gameOne.addMove(3)
      expect(gameOne.winningStreak).toEqual(["1", "2", "3"])
      expect(() => gameOne.addMove(5)).toThrow()
    })
  })
})

describe('winCollector', () => {
  it('checks for vertical win', () => {
    const winOne = winCollector(verticalWinOne)
    const winTwo = winCollector(verticalWinTwo)
    const winThree = winCollector(verticalWinThree)

    expect(winOne).toStrictEqual(["1","4","7"])
    expect(winTwo).toStrictEqual(["2","5","8"])
    expect(winThree).toStrictEqual(["3","6","9"])
  })
  it('checks for diagonal win', () => {
    const winOne = winCollector(diagonalWinOne)
    const winTwo = winCollector(diagonalWinTwo)

    expect(winOne).toStrictEqual(["1","5","9"])
    expect(winTwo).toStrictEqual(["3","5","7"])
  })
  it('checks for horizontal win', () => {
    const winOne = winCollector(horizontalWinOne)
    const winTwo = winCollector(horizontalWinTwo)
    const winThree = winCollector(horizontalWinThree)

    expect(winOne).toStrictEqual(["1","2","3"])
    expect(winTwo).toStrictEqual(["4","5","6"])
    expect(winThree).toStrictEqual(["7","8","9"])
  })
})

describe('filterWinsBy', () => {
  it('returns wins that include the given position win', () => {
    expect(filterWinsBy("1")).toEqual([
      [
        "1",
        "2",
        "3",
      ],
      [
        "1",
        "4",
        "7",
      ],
      [
        "1",
        "5",
        "9",
      ],
    ])
  })
})


describe('filterFilledPositions', () => {
  it('returns board positions that have a piece in them', () => {
    expect(filterFilledPositions(emptyBoard)).toEqual([])
    expect(filterFilledPositions(verticalWinOne)).toEqual(["1", "4", "7"])
  })
})