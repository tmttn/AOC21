(() => {
  //read numbers from src/06/input.txt and return it
  const readInput = () => {
    const input = require('fs').readFileSync('src/06/input.txt', 'utf8');
    return input.split(',').map(number => parseInt(number));
  };

  
  module.exports.solve = () => {
    const lanternFish = readInput();
    const days = 80;

    for (let i = 0; i < days; i++) {
      // For each lantern fish
      const currentLength = lanternFish.length;
      for (let j = 0; j < currentLength; j++) {
        // Add a new fish if the lantern fish is 0
        if (lanternFish[j] === 0) {
          lanternFish.push(8);
        }

        // Substract 1 from the lantern fish and set it to 6 if it's negative
        lanternFish[j]--;
        if (lanternFish[j] < 0) {
          lanternFish[j] = 6;
        }
      }
    }

    console.log(`Day 6, star 1: ${lanternFish.length}`);
  };

  module.exports.solve2 = () => {
    const lanternFish = readInput();
    const days = 256;

    // Count the occurences of each number
    let occurences = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < lanternFish.length; i++) {
      if (occurences[lanternFish[i]] === undefined) {
        occurences[lanternFish[i]] = 1;
      } else {
        occurences[lanternFish[i]]++;
      }
    }

    for (let i = 0; i < days; i++) {
      const newFishes = [occurences[1], occurences[2], occurences[3], occurences[4], occurences[5], occurences[6], occurences[0] + occurences[7], occurences[8], occurences[0]];
      occurences = newFishes;
    }

    // Sum the occurences
    let sum = 0;
    for (let i = 0; i < occurences.length; i++) {
      sum += occurences[i];
    }

    console.log(`Day 6, star 2: ${sum}`);
  };
})();
