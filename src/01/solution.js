(() => {
  // Read input.txt file and print the number of lines in the file where the current value is numerically greater than the previous value.
  module.exports.solve = () => {
    const input = require("fs").readFileSync("src/01/input.txt", "utf8");
    const lines = input.split("\n");
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
      if (i > 0 && parseInt(lines[i]) > parseInt(lines[i - 1])) {
        count++;
      }
    }

    console.log(`Day 1, star 1: ${count}`);
  };

  // Read src/01/input.txt file and create an array of the sliding window of 3 numbers.
  module.exports.solve2 = () => {
    const input = require("fs").readFileSync("src/01/input.txt", "utf8");
    const lines = input.split("\n");
    const arr = [];
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
      if (i >= 2) {
        arr.push(
          parseInt(lines[i]) + parseInt(lines[i - 2]) + parseInt(lines[i - 1])
        );
      }
    }

    for (let i = 0; i < lines.length; i++) {
      if (i > 0 && parseInt(lines[i]) > parseInt(lines[i - 1])) {
        count++;
      }
    }

    console.log(`Day 1, star 2: ${count}`);
  };
})();
