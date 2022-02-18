"use strict";
// Board
exports.__esModule = true;
exports.checkForWin = exports.addMove = exports.createBoard = void 0;
var board = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null
};
function createBoard() {
    return board;
}
exports.createBoard = createBoard;
function addMove(symbol, position) {
    if (Object.keys(board).includes(position.toString())) {
        board[position] = symbol;
    }
    else {
        throw Error('that is an invalid move!!');
    }
    return board;
}
exports.addMove = addMove;
// should we always run through the board, to find if there is a win? 
// are there other ways, to narrow it down?
// What should we do if there is a tie? Should ties be impossible?
function checkForWin(board) {
    var possibleWins = [
        ["1", "2", "3"],
        ["1", "4", "7"],
        ["1", "5", "9"],
        ["2", "5", "8"],
        ["3", "6", "9"],
        ["3", "5", "7"],
        ["4", "5", "6"],
        ["7", "8", "9"], //H
    ];
    var win = [];
    for (var _i = 0, possibleWins_1 = possibleWins; _i < possibleWins_1.length; _i++) {
        var possibleWin = possibleWins_1[_i];
        if (win.length === 3) {
            return win;
        }
        win = possibleWin.reduce(function (accumulator, currentValue, currentIndex, array) {
            if (board["".concat(currentValue)] === null) {
                // When there is no value in the cell, reset the streak of moves.
                // Possible improvement: only zero out the streak if there is a streak length
                accumulator = [];
            }
            else {
                if (currentIndex === 0) {
                    // If there is a symbol in the cell and it's the first position of our possible Win
                    // use it to start the streak
                    accumulator.push(currentValue);
                }
                else {
                    // If the symbol of the current position is the same as the symbol at the last cell
                    // of our possilbe win, it's a streak, so add it to the streak
                    console.log(board["".concat(currentValue)], board["".concat(array[currentIndex - 1])]);
                    if (board["".concat(currentValue)] === board["".concat(array[currentIndex - 1])]) {
                        // Hint: push is a mutator. You will mutate the accumulator here, so 
                        // you won't have it as it was before. Consider what other possibilities there
                        // are for returning a new value
                        accumulator.push(currentValue);
                    }
                    else {
                        // If the symbol in the current and last position of the possible win are not
                        // the same, the streak is broken. 0 it out!
                        accumulator = [];
                    }
                }
            }
            console.log('acc', accumulator);
            return accumulator;
        }, []);
    }
    console.log('win', win);
    return win;
}
exports.checkForWin = checkForWin;