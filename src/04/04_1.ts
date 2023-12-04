import {input} from "./04_data";

const cards = input
    .split("\n")
    .map(
        line => line
            .split(":")[1].trim()
            .split(" | ")
            .map(
                stringWithNumbers => stringWithNumbers
                    .split(/\s+/)
                    .map(Number)
            )
    );

let sum = 0;
for (const card of cards) {
    let winningNumbersCount = 0;
    for (const winningNumber of card[0]) {
        if (card[1].includes(winningNumber)) {
            winningNumbersCount++;
        }
    }
    if (winningNumbersCount > 0) {
        sum += Math.pow(2, winningNumbersCount - 1);
    }
}

console.log(sum);
