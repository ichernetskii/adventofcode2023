import {input} from "./04_data";

const getWinningNumbersCount = (winningNumbers: number[], card: Set<number>): number => {
    return winningNumbers.reduce(
        (acc, winningNumber) => acc + (card.has(winningNumber) ? 1 : 0),
        0,
    );
}

const cards: any = input
    .split("\n")
    .map(
        line => line
            .split(":")[1].trim()
            .split(" | ")
            .map(
                (stringWithNumbers, idx) => {
                    const numbers = stringWithNumbers
                        .split(/\s+/)
                        .map(Number);
                    return idx === 0 ? numbers : new Set(numbers);
                }
            )
    );

const processedCardsIds: Record<number, number> = {};
const cardIds = Array.from({length: cards.length}).fill(0).map((_, idx) => idx);

while (cardIds.length > 0) {
    const cardId = cardIds.pop()!;
    processedCardsIds[cardId] = processedCardsIds[cardId] !== undefined ? processedCardsIds[cardId] + 1 : 1;
    const [winning, myCards] = cards[cardId];
    const winningNumbersCount = getWinningNumbersCount(winning, myCards);

    for (let i = cardId + 1; i <= cardId + winningNumbersCount; i++) {
        if (i < cards.length) {
            cardIds.push(i);
        }
    }
}

const sum = Object.values(processedCardsIds).reduce((acc, count) => acc + count, 0);

console.log(sum);
