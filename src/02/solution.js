(() => {
  // Read a series of directions from file src/02/input.txt and follow them.
  module.exports.solve = () => {
    const input = require("fs").readFileSync("src/02/input.txt", "utf8");
    const lines = input.split("\n");

    let x = 0;
    let y = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const direction = line.split(" ")[0];
      const distance = parseInt(line.split(" ")[1]);

      switch (direction) {
        case "up":
          y -= distance;
          break;
        case "down":
          y += distance;
          break;
        case "forward":
          x += distance;
          break;
        default:
          throw new Error(`Unknown direction: ${direction}`);
      }
    }

    console.log(`Day 2, star 1: ${x * y}`);
  };

  module.exports.solve2 = () => {
    const input = require("fs").readFileSync("src/02/input.txt", "utf8");
    const lines = input.split("\n");

    let x = 0;
    let y = 0;
    let aim=0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const direction = line.split(" ")[0];
      const distance = parseInt(line.split(" ")[1]);

      switch (direction) {
        case "up":
          aim -= distance;
          break;
        case "down":
          aim += distance;
          break;
        case "forward":
          x += distance;
          y += aim * distance;
          break;
        default:
          throw new Error(`Unknown direction: ${direction}`);
      }
    }

    console.log(`Day 2, star 2: ${x * y}`);
  };
})();
