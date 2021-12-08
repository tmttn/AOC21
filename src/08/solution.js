(() => {
  // Read every line of file src/08/input.txtGet and get all input and output mappings seperated by " | " and return them
  const getMappings = () => {
    const fs = require("fs");
    const file = fs.readFileSync("src/08/input.txt", "utf8");
    const lines = file.split("\n");
    const mappings = [];
    lines.forEach((line) => {
      const mapping = line.split(" | ");

      // Push the mapping sorted alphabetically
      mappings.push({
        input: mapping[0].split(" "),
        output: mapping[1].split(" "),
      });
    });
    return mappings;
  };

  // Check each output mapping and count all segments that are of the following forms: "abcdefg", "bceg", "bcg", "cg"
  module.exports.solve = () => {
    const mappings = getMappings();
    let count = 0;
    mappings.forEach((mapping) => {
      mapping.output.forEach((segment) => {
        if (segment.length === 7) {
          count++;
        } else if (segment.length === 4) {
          count++;
        } else if (segment.length === 3) {
          count++;
        } else if (segment.length === 2) {
          count++;
        }
      });
    });
    console.log(`Day 8, star 1: ${count}`);
  };

  module.exports.solve2 = () => {
    const mappings = getMappings();
    let sum = 0;

    mappings.forEach((mapping) => {
      const possibleMappings = {
        a: ["a", "b", "c", "d", "e", "f", "g"],
        b: ["a", "b", "c", "d", "e", "f", "g"],
        c: ["a", "b", "c", "d", "e", "f", "g"],
        d: ["a", "b", "c", "d", "e", "f", "g"],
        e: ["a", "b", "c", "d", "e", "f", "g"],
        f: ["a", "b", "c", "d", "e", "f", "g"],
        g: ["a", "b", "c", "d", "e", "f", "g"],
      };
      mapping.input.forEach((segment) => {
        switch (segment.length) {
          case 6:
            possibleMappings.a = possibleMappings.a.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            possibleMappings.b = possibleMappings.b.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            possibleMappings.f = possibleMappings.f.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            possibleMappings.g = possibleMappings.g.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            break;
          case 5:
            possibleMappings.a = possibleMappings.a.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            possibleMappings.d = possibleMappings.d.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            possibleMappings.g = possibleMappings.g.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            break;
          case 4:
            possibleMappings.b = possibleMappings.b.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            possibleMappings.c = possibleMappings.c.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            possibleMappings.d = possibleMappings.d.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            possibleMappings.f = possibleMappings.f.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            break;
          case 3:
            possibleMappings.a = possibleMappings.a.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            possibleMappings.c = possibleMappings.c.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            possibleMappings.f = possibleMappings.f.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            break;
          case 2:
            possibleMappings.c = possibleMappings.c.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            possibleMappings.f = possibleMappings.f.filter(
              (possibleMapping) => segment.indexOf(possibleMapping) !== -1
            );
            break;
        }
      });

      // While the length of each possible mapping is greater than 1
      while (
        possibleMappings.a.length > 1 ||
        possibleMappings.b.length > 1 ||
        possibleMappings.c.length > 1 ||
        possibleMappings.d.length > 1 ||
        possibleMappings.e.length > 1 ||
        possibleMappings.f.length > 1 ||
        possibleMappings.g.length > 1
      ) {
        // For each possible mapping
        for (let key in possibleMappings) {
          // If the length of the possible mapping is 1
          if (possibleMappings[key].length === 1) {
            // Remove the mapping from all other possible mappings
            for (let otherKey in possibleMappings) {
              if (otherKey !== key) {
                possibleMappings[otherKey] = possibleMappings[otherKey].filter(
                  (possibleMapping) =>
                    possibleMapping !== possibleMappings[key][0]
                );
              }
            }
          }
        }
      }

      // For each output segment
      let number = "";
      mapping.output.forEach((segment) => {
        if (segment.length === 7) {
          number += 8;
        } else if (segment.length === 4) {
          number += 4;
        } else if (segment.length === 3) {
          number += 7;
        } else if (segment.length === 2) {
          number += 1;
        } else {
          number += decodeSegment(segment, possibleMappings);
        }
      });

      sum += parseInt(number);
    });

    console.log(`Day 8, star 2: ${sum}`);
  };

  function decodeSegment(segment, decryptionKey) {
    // Decode segment with decryption key. If the key contains the character, return the key.
    let decodedSegment = "";

    segment.split("").forEach((character) => {
      for (let key in decryptionKey) {
        if (decryptionKey[key][0] === character) {
          decodedSegment += key;
        }
      }
    });

    switch (decodedSegment.split("").sort().join("")) {
      case "abcefg":
        return 0;
      case "acdeg":
        return 2;
      case "acdfg":
        return 3;
      case "abdfg":
        return 5;
      case "abdefg":
        return 6;
      case "abcdfg":
        return 9;
      default:
        console.log('wtf?===============================================================')
        console.log(`segment: ${segment}\ndecoded segment: ${decodedSegment}\nsorted decoded segment: ${decodedSegment.split("").sort().join("")}`);
        console.log(`decryption key:`);
        console.log(decryptionKey);
        return 0;
      }
  }
})();
