(() => {
  //read numbers from src/06/input.txt and return it
  const readInput = () => {
    const input = require('fs').readFileSync('src/07/input.txt', 'utf8');
    return input.split(',').map(number => parseInt(number));
  };

  
  module.exports.solve = () => {
    const positions = readInput();

    // Sort the positions from lowest to highest
    const sortedPositions = positions.sort((a, b) => a - b);

    // Find the middle position
    const middlePosition = sortedPositions[Math.floor(sortedPositions.length / 2)];

    // The sum of all differences between the positions and the middle position
    const totalDifference = positions.reduce((acc, curr) => acc + Math.abs(curr - middlePosition), 0);

    console.log(`Day 7, star 1: ${totalDifference}`);
  };

  module.exports.solve2 = () => {
    const positions = readInput();

    // Optimal position is the rounded average of the positions
    const optimalPosition = Math.round(positions.reduce((acc, curr) => acc + curr, 0) / positions.length) - 1;

    // The sum of all difference between the positions and the optimal position
    const totalDifference = positions.reduce((acc, curr) => acc + getCost(Math.abs(curr - optimalPosition)), 0);

    console.log(`Day 7, star 2: ${totalDifference}`);
  };

  const getCost = (difference) => {
    let sum =0;
    for(i=1; i <= difference; i++) {
      sum += i;
    }
    return sum;
  }
})();
