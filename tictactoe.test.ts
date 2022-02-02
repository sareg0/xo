import {tictactoe} from './tictactoe'

test('creates empty board', () => {
  const thing = tictactoe()
  expect(thing).toBe(3)
})