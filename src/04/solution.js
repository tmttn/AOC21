(() => {
  // Read numbers from numbers.txt and return them
  const readNumbers = () => {
    return require("fs")
      .readFileSync("src/04/numbers.txt", "utf8")
      .split(",")
      .map((number) => parseInt(number));
  };

  // Read boards from boards.txt and return them. Each board is a matrix of numbers and is separated by a blank line.
  const readBoards = () => {
    const boards = require("fs")
      .readFileSync("src/04/boards.txt", "utf8")
      .split("\n\n");

    return boards.map((board) =>
      board.split("\n").map((row) =>
        row
          .trim()
          .replace("  ", " ")
          .replace("  ", " ")
          .split(" ")
          .map((number) => parseInt(number))
      )
    );
  };

  module.exports.solve = () => {
    // For each number, replace the number in each board with 0
    const boards = readBoards();
    const numbers = readNumbers();
    let finished = false;

    numbers.forEach((drawnNumber) => {
      if (!finished) {
        boards.forEach((board) => {
          board.forEach((row, rowIndex) => {
            row.forEach((number, numberIndex) => {
              if (number === drawnNumber) {
                board[rowIndex][numberIndex] = 0;
              }
            });
          });
        });

        // Check if any zeroed boards contain rows with only 0s, or positions with only 0s
        const zeroedBoards = boards.filter((board) => {
          let zeroed = false;
          board.forEach((row) => {
            if (row.every((number) => number === 0)) {
              zeroed = true;
            }
          });

          // rotate board
          const rotatedBoard = board.map((val, index) =>
            board.map((row) => row[index]).reverse()
          );

          rotatedBoard.forEach((row) => {
            if (row.every((number) => number === 0)) {
              zeroed = true;
            }
          });

          return zeroed;
        });

        // If there are zeroed boards, there is a winner
        if (zeroedBoards.length > 0) {
          //sum of all numbers of zeroed board 0
          const sum = zeroedBoards[0].reduce((acc, row) => {
            return acc + row.reduce((acc, number) => acc + number);
          }, 0);

          console.log(`Day 4, star 1: ${sum * drawnNumber}`);
          finished = true;
        }
      }
    });
  };

  module.exports.solve2 = () => {
    // For each number, replace the number in each board with 0
    const boards = readBoards();
    const numbers = readNumbers();
    const allZeroedBoards = [];
    let lastDrawnNumber;

    numbers.forEach((drawnNumber) => {
      boards.forEach((board) => {
        board.forEach((row, rowIndex) => {
          row.forEach((number, numberIndex) => {
            if (number === drawnNumber) {
              board[rowIndex][numberIndex] = 0;
            }
          });
        });
      });

      // Check if any zeroed boards contain rows with only 0s, or positions with only 0s
      const zeroedBoards = boards.filter((board) => {
        let zeroed = false;
        board.forEach((row) => {
          if (row.every((number) => number === 0)) {
            zeroed = true;
          }
        });

        // rotate board
        const rotatedBoard = board.map((val, index) =>
          board.map((row) => row[index]).reverse()
        );

        rotatedBoard.forEach((row) => {
          if (row.every((number) => number === 0)) {
            zeroed = true;
          }
        });

        return zeroed;
      });

      // Add all zeroed boards to allZeroedBoards
      zeroedBoards.forEach((board) => {
        allZeroedBoards.push(board);
      });

      //remove zeroed boards from boards
      boards.forEach((board, index) => {
        if (zeroedBoards.includes(board)) {
          boards.splice(index, 1);
        }
      });

      if (zeroedBoards.length > 0) {
        lastDrawnNumber = drawnNumber;
      }
    });

    const sum = allZeroedBoards[allZeroedBoards.length - 1].reduce(
      (acc, row) => {
        return acc + row.reduce((acc, number) => acc + number);
      },
      0
    );
    
    console.log(`Day 4, star 2: ${sum * lastDrawnNumber}`);
  };
})();
