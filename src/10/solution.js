(() => {
  // Read file src/10/input.txt and parse it to an array of strings. Each string contains chunks.
  function readChunks() {
    return require("fs").readFileSync("src/10/input.txt", "utf8").split("\n");
  }

  module.exports.solve = () => {
    let score = 0;
    const scoreChart = {
      ")": 3,
      "]": 57,
      "}": 1197,
      ">": 25137,
    };

    // Find lines with invalid chunks. A valid chunk is a chunk with matching nested bracket pairs.
    readChunks().forEach((chunk) => {
      let openBrackets = [];
      for (let i = 0; i < chunk.length; i++) {
        const char = chunk[i];
        if (char === "{" || char === "[" || char === "(" || char === "<") {
          openBrackets.push(char);
        } else if (
          char === "}" ||
          char === "]" ||
          char === ")" ||
          char === ">"
        ) {
          const lastOpenBracket = openBrackets.pop();
          if (
            (char === "}" && lastOpenBracket !== "{") ||
            (char === "]" && lastOpenBracket !== "[") ||
            (char === ")" && lastOpenBracket !== "(") ||
            (char === ">" && lastOpenBracket !== "<")
          ) {
            score += scoreChart[char];
          }
        }
      }
    });

    console.log(`Day 10, star 1: ${score}`);
  };

  module.exports.solve2 = () => {
    let scores = [];
    const scoreChart = {
      ")": 1,
      "]": 2,
      "}": 3,
      ">": 4,
    };

    // Filter out lines with invalid chunks. A valid chunk is a chunk with matching nested bracket pairs.
    const incompleteChunks = readChunks().filter((chunk) => {
      let openBrackets = [];

      for (let i = 0; i < chunk.length; i++) {
        const char = chunk[i];
        if (char === "{" || char === "[" || char === "(" || char === "<") {
          openBrackets.push(char);
        } else {
          const lastOpenBracket = openBrackets.pop();
          if (
            (char === "}" && lastOpenBracket !== "{") ||
            (char === "]" && lastOpenBracket !== "[") ||
            (char === ")" && lastOpenBracket !== "(") ||
            (char === ">" && lastOpenBracket !== "<")
          ) {
            return false;
          }
        }
      }
      return true;
    });

    incompleteChunks.forEach((chunk) => {
      let openBrackets = [];

      for (let i = 0; i < chunk.length; i++) {
        const char = chunk[i];
        if (char === "{" || char === "[" || char === "(" || char === "<") {
          openBrackets.push(char);
        } else {
          const lastOpenBracket = openBrackets.pop();
        }
      }

      // Replace all open brackets with their matching closing brackets.
      const closingBrackets = openBrackets.reverse().map((bracket) => {
        if (bracket === "{") {
          return "}";
        } else if (bracket === "[") {
          return "]";
        } else if (bracket === "(") {
          return ")";
        } else if (bracket === "<") {
          return ">";
        }
      });

      let score = 0;
      closingBrackets.forEach((bracket) => {
        score = score * 5 + scoreChart[bracket];
      });

      scores.push(score);
    });

    // Sort scores and return the middle score.
    scores = scores.sort((a, b) => a - b);
    //Get middle value of scores
    const middle = Math.floor(scores.length / 2);
    console.log(`Day 10, star 2: ${scores[middle]}`);
  };
})();
