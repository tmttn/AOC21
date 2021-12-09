(() => {
  // Read a grid of numbers from src/09/input.txt and return it as a 2D array.
  function readGrid() {
    const grid = [];
    const input = require("fs").readFileSync("src/09/input.txt", "utf8");
    for (let line of input.split("\n")) {
      grid.push(line.split("").map(Number));
    }
    return grid;
  }

  module.exports.solve = () => {
    // Get the grid
    const grid = readGrid();

    const lowPoints = getLowPoints(grid);

    //Calculate the sum of the risk levels of the low points. The risk level of a point is the value of that point increased by one.
    console.log(`Day 9, star 1: ${lowPoints.reduce((sum, point) => sum + point.point + 1, 0)}`);
  };

  module.exports.solve2 = () => {
    // Get the grid
    const grid = readGrid();

    const lowPoints = getLowPoints(grid);

    const basins = getBasins(lowPoints, grid);

    /* The size of a basin is the number of locations within the basin, including the low point. Find the three largest basins and multiply their sizes together. */
    const largestBasins = basins.sort((a, b) => b.length - a.length).slice(0, 3);

    console.log(`Day 9, star 2: ${largestBasins.reduce((sum, basin) => sum * basin.length, 1)}`);
  };

  // Find the low points in the grid. Low points are points that are smaller than all of their neighbors.
  function getLowPoints(grid) {
    const lowPoints = [];

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const point = grid[y][x];
        const neighbors = [
          grid[y - 1] && grid[y - 1][x],
          grid[y][x - 1],
          grid[y][x + 1],
          grid[y + 1] && grid[y + 1][x]
        ].filter((n) => n === undefined ? false : true);
        if (point < Math.min(...neighbors)) {
          lowPoints.push({ x, y, point });
        }
      }
    }

    return lowPoints;
  }

  // Find the basins in the grid.
  function getBasins(lowPoints, grid) {
    const basins = [];

    for (let lowPoint of lowPoints) {
      const basin = getBasin(lowPoint, grid);
      if (basin.length > 0) {
        basins.push(basin);
      }
    }

    return basins;
  }

  // Find the basin of a low point. /* A basin is all locations that eventually flow downward to a single low point. Therefore, every low point has a basin, although some basins are very small. Locations of height 9 do not count as being in any basin, and all other locations will always be part of exactly one basin. */
  function getBasin(lowPoint, grid) {
    const basin = [];
    const queue = [lowPoint];

    while (queue.length > 0) {
      const point = queue.shift();
      if (basinIncludesPoint(basin, point) || point.point === 9) {
        continue;
      }
      basin.push(point);

      const neighbors = [
        {x: point.x, y: point.y-1, point: grid[point.y - 1] && grid[point.y - 1][point.x]},
        {x: point.x-1, y: point.y, point: grid[point.y][point.x - 1]},
        {x: point.x +1, y: point.y, point: grid[point.y][point.x + 1]},
        {x: point.x, y: point.y+1, point: grid[point.y + 1] && grid[point.y + 1][point.x]}
      ].filter((n) => n.point === undefined ? false : true);
      for (let neighbor of neighbors) {
        if (neighbor.point > point.point) {
          queue.push(neighbor);
        }
      }
    }

    return basin;
  }

  function basinIncludesPoint(basin, point) {
    for (let bp of basin) {
      if (bp.x === point.x && bp.y === point.y) {
        return true;
      }
    }
    return false;
  }
})();
