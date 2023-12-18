import {input} from "./09_data.js";

function parseInput(input) {
  return input.split('\n').map(line => line.split(' ').map(Number));
}

function extrapolateBackwardsAndSum(histories) {
  function getPreviousValue(history) {
    let sequences = [history];
    while (true) {
      let lastSeq = sequences[sequences.length - 1];
      let newSeq = [];
      for (let i = 0; i < lastSeq.length - 1; i++) {
        newSeq.push(lastSeq[i + 1] - lastSeq[i]);
      }
      sequences.push(newSeq);
      if (newSeq.every(val => val === 0)) break;
    }

    for (let i = sequences.length - 2; i >= 0; i--) {
      let firstVal = sequences[i][0];
      let diffVal = sequences[i + 1][0];
      sequences[i].unshift(firstVal - diffVal);
    }

    return sequences[0][0];
  }

  return histories.map(getPreviousValue).reduce((a, b) => a + b, 0);
}

let parsedHistories = parseInput(input);
console.log(extrapolateBackwardsAndSum(parsedHistories));
