import {createBoard, addMove} from './tictactoe'

const board = {
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

test('creates empty board', () => {
  const thing = createBoard()
  expect(board).toEqual(board)
})

test('makes a move', () => {
  const thing = addMove('x', 1)
  expect(thing).toEqual({
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
})