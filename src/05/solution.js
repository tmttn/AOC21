(() => {
  // Read line coordinates from src/05/input.txt and return them as an array of objects. Each line is a string of the form "x1,y1 -> x2,y2"
  const readLines = () => {
    const fs = require("fs");
    const lines = fs.readFileSync("src/05/input.txt", "utf8").split("\n");
    return lines.map((line) => {
      const [x1, y1, x2, y2] = line
        .split(" -> ")
        .map((coord) => coord.split(",").map(Number))
        .flat();
      return { x1, y1, x2, y2 };
    });
  };

  // Return all coordinates of a line as an array of objects
  const getLineCoordinates = (line) => {
    const { x1, y1, x2, y2 } = line;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const n = Math.max(Math.abs(dx), Math.abs(dy));
    const xInc = dx / n;
    const yInc = dy / n;
    const coordinates = [];
    for (let i = 0; i <= n; i++) {
      const x = x1 + xInc * i;
      const y = y1 + yInc * i;
      coordinates.push({ x, y });
    }
    return coordinates;
  };

  module.exports.solve = () => {
    // Get all line coordinates
    const lines = readLines();
    const coordinateCounts = [];

    lines.forEach((line) => {
      // If the line is vertical or horizontal
      if (line.x1 === line.x2 || line.y1 === line.y2) {
        const coordinates = getLineCoordinates(line);
        coordinates.forEach((coordinate) => {
          coordinateCounts[coordinate.x + "," + coordinate.y] =
            (coordinateCounts[coordinate.x + "," + coordinate.y] || 0) + 1;
        });
      }
    });

    // Count all coordinates with at least 2 lines
    const count = Object.values(coordinateCounts).filter(
      (count) => count >= 2
    ).length;

    console.log(`Day 5, star 1: ${count}`);
  };

  module.exports.solve2 = () => {
    // Get all line coordinates
    const lines = readLines();
    const coordinateCounts = [];

    lines.forEach((line) => {
      const coordinates = getLineCoordinates(line);

      coordinates.forEach((coordinate) => {
        coordinateCounts[coordinate.x + "," + coordinate.y] =
          (coordinateCounts[coordinate.x + "," + coordinate.y] || 0) + 1;
      });
    });

    // Count all coordinates with at least 2 lines
    const count = Object.values(coordinateCounts).filter(
      (count) => count >= 2
    ).length;

    console.log(`Day 5, star 2: ${count}`);
  };
})();
