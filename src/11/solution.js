(() => {
  // Return file src/11/input.txt as a grid of numbers
  function readGrid() {
    const file = require("fs").readFileSync("./src/11/input.txt", "utf8");
    return file.split("\n").map((row) =>
      row.split("").map((x) => {
        return { energyLevel: parseInt(x), flashed: false };
      })
    );
  }

  module.exports.solve = () => {
    // Simulate 100 steps and count all flashes
    const simulation = {
      grid: readGrid(),
      flashes: 0,
      steps: 100,
      run: function () {
        for (let i = 0; i < this.steps; i++) {
          this.step();
        }
        return this.flashes;
      },
      /*
      During a single step, the following occurs:

      First, the energy level of each octopus increases by 1.
      Then, any octopus with an energy level greater than 9 flashes. This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent. If this causes an octopus to have an energy level greater than 9, it also flashes. This process continues as long as new octopuses keep having their energy level increased beyond 9. (An octopus can only flash at most once per step.)
      Finally, any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.
      */
      step: function () {
        // Increase the energy level of each octopus by 1
        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[i].length; j++) {
            this.grid[i][j].energyLevel++;
          }
        }

        // Flash any octopus with an energy level greater than 9 if it has not already flashed
        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[i].length; j++) {
            if (this.grid[i][j].energyLevel > 9 && !this.grid[i][j].flashed) {
              this.flashOctopus(i, j);
            }
          }
        }

        // Reset flashed octopuses
        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[i].length; j++) {
            if (this.grid[i][j].flashed) {
              this.grid[i][j].flashed = false;
              this.grid[i][j].energyLevel = 0;
            }
          }
        }
      },
      flashOctopus(i, j) {
        this.grid[i][j].flashed = true;
        this.flashes++;

        // Increase the energy level of all 9 surrounding octopuses by 1
        for (let x = i - 1; x <= i + 1; x++) {
          for (let y = j - 1; y <= j + 1; y++) {
            if (
              x >= 0 &&
              x < this.grid.length &&
              y >= 0 &&
              y < this.grid[x].length
            ) {
              this.grid[x][y].energyLevel++;
            }
          }
        }

        this.flashAdjacent(i, j);
      },
      flashAdjacent(i, j) {
        // Flash all 9 adjacent octopuses
        for (let k = i - 1; k <= i + 1; k++) {
          for (let l = j - 1; l <= j + 1; l++) {
            if (
              k >= 0 &&
              k < this.grid.length &&
              l >= 0 &&
              l < this.grid[k].length &&
              !this.grid[k][l].flashed
            ) {
              if (this.grid[k][l].energyLevel > 9) {
                this.flashOctopus(k, l);
              }
            }
          }
        }
      },
    };

    console.log(`Day 11, star 1: ${simulation.run()}`);
  };

  module.exports.solve2 = () => {
    const simulation = {
      grid: readGrid(),
      run: function () {
        for (let i = 1; true; i++) {
          if(this.step()) {
            return i;
          }
        }
      },
      /*
      During a single step, the following occurs:

      First, the energy level of each octopus increases by 1.
      Then, any octopus with an energy level greater than 9 flashes. This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent. If this causes an octopus to have an energy level greater than 9, it also flashes. This process continues as long as new octopuses keep having their energy level increased beyond 9. (An octopus can only flash at most once per step.)
      Finally, any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.
      */
      step: function () {
        // Increase the energy level of each octopus by 1
        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[i].length; j++) {
            this.grid[i][j].energyLevel++;
          }
        }

        // Flash any octopus with an energy level greater than 9 if it has not already flashed
        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[i].length; j++) {
            if (this.grid[i][j].energyLevel > 9 && !this.grid[i][j].flashed) {
              this.flashOctopus(i, j);
            }
          }
        }

        // Check if all octopuses have been flashed
        let allFlashed = true;
        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[i].length; j++) {
            if (!this.grid[i][j].flashed) {
              allFlashed = false;
            }
          }
        }

        if(allFlashed) {
          return true;
        }

        // Reset flashed octopuses
        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[i].length; j++) {
            if (this.grid[i][j].flashed) {
              this.grid[i][j].flashed = false;
              this.grid[i][j].energyLevel = 0;
            }
          }
        }
      },
      flashOctopus(i, j) {
        this.grid[i][j].flashed = true;

        // Increase the energy level of all 9 surrounding octopuses by 1
        for (let x = i - 1; x <= i + 1; x++) {
          for (let y = j - 1; y <= j + 1; y++) {
            if (
              x >= 0 &&
              x < this.grid.length &&
              y >= 0 &&
              y < this.grid[x].length
            ) {
              this.grid[x][y].energyLevel++;
            }
          }
        }

        this.flashAdjacent(i, j);
      },
      flashAdjacent(i, j) {
        // Flash all 9 adjacent octopuses
        for (let k = i - 1; k <= i + 1; k++) {
          for (let l = j - 1; l <= j + 1; l++) {
            if (
              k >= 0 &&
              k < this.grid.length &&
              l >= 0 &&
              l < this.grid[k].length &&
              !this.grid[k][l].flashed
            ) {
              if (this.grid[k][l].energyLevel > 9) {
                this.flashOctopus(k, l);
              }
            }
          }
        }
      },
    };

    console.log(`Day 11, star 2: ${simulation.run()}`);
  };
})();
