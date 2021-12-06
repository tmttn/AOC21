const { count } = require('console');

(() => {
  // Read binary numbers from file src/03/input.txt and print the most common bit for each position.
  module.exports.solve = () => {
    const fs = require('fs');
    const input = fs.readFileSync('src/03/input.txt', 'utf8');
    const lines = input.split('\n');
    const bitCounts = new Array(lines[0].length).fill(0);
    let gamma = "";
    let epsilon;

    lines.forEach(line => {
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '1') {
          bitCounts[i]++;
        }
      }
    });

    bitCounts.forEach(count => gamma += (count >= lines.length / 2 ? '1' : '0'));

    // gamma is bit flipped to get epsilon
    epsilon = gamma.split('').map(bit => bit === '1' ? '0' : '1').join('');

    gamma = parseInt(gamma, 2);
    epsilon = parseInt(epsilon, 2);

    console.log(`Day 3, star 1: ${parseInt(gamma * epsilon)}`);
  };

  // Read binary numbers from file src/03/input.txt. Consider every position in the binary number and get the most common bit. Filter out all numbers that don't have the most common bit at the position. Repeat until one number remains. Print the last remaining number.
  module.exports.solve2 = () => {
    const fs = require('fs');
    const input = fs.readFileSync('src/03/input.txt', 'utf8');
    
    let lines = input.split('\n');
    let leastCommonLines = input.split('\n');
    let position = 0;
  
    while(lines.length > 1) {
      let bitCount = 0;
      lines.forEach(line => {
          if (line[position] === '1') {
            bitCount++;
        }
      });

      if(bitCount >= lines.length / 2) {
        lines = lines.filter(line => line[position] === '1');
      } else {
        lines = lines.filter(line => line[position] === '0');
      }

      position++;
    }

    position=0;
    while(leastCommonLines.length > 1) {
      let bitCount = 0;
      leastCommonLines.forEach(line => {
          if (line[position] === '1') {
            bitCount++;
        }
      });

      if(bitCount < leastCommonLines.length / 2) {
        leastCommonLines = leastCommonLines.filter(line => line[position] === '1');
      } else {
        leastCommonLines = leastCommonLines.filter(line => line[position] === '0');
      }

      position++;
    }

    const oxygen = parseInt(lines[0], 2);
    const co2 = parseInt(leastCommonLines[0], 2);

    console.log(`Day 3, star 2: ${parseInt(oxygen * co2)}`);
  };
})();
