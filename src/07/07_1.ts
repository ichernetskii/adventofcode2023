import {input} from "./07_data";

const hasPair = (hand: string) => /([2-9TJQKA]).*\1/g.test(hand);
const hasTwoPairs = (hand: string) => /(?=([2-9TJQKA]).*\1)(?=.*(?!\1)([2-9TJQKA]).*\2).*/g.test(hand);
const hasThree = (hand: string) => /([2-9TJQKA]).*\1.*\1/g.test(hand);
const hasFullHouse = (hand: string) => {
    const set = [...new Set(hand)];
    return set.length === 2 && (hasThree(hand) || hasTwoPairs(hand));
};

const hasFour = (hand: string) => /([2-9TJQKA]).*\1.*\1.*\1/g.test(hand);

const hasFive = (hand: string) => [...hand].every(card => card === hand[0]);

const getPowerOfCombination = (hand: string) => {
    if (hasFive(hand)) {
        return 7;
    }
    if (hasFour(hand)) {
        return 6;
    }
    if (hasFullHouse(hand)) {
        return 5;
    }
    if (hasThree(hand)) {
        return 4;
    }
    if (hasTwoPairs(hand)) {
        return 3;
    }
    if (hasPair(hand)) {
        return 2;
    }
    return 1;
}

const getPowerOfCard = (card: string) => {
    const cardValue = card[0];
    switch (cardValue) {
        case "T":
            return 10;
        case "J":
            return 11;
        case "Q":
            return 12;
        case "K":
            return 13;
        case "A":
            return 14;
        default:
            return Number(cardValue);
    }
}

const compareHands = (hand1: string, hand2: string) => {
    const power1 = getPowerOfCombination(hand1);
    const power2 = getPowerOfCombination(hand2);
    if (power1 > power2) {
        return 1;
    }
    if (power1 < power2) {
        return -1;
    }

    for(let i = 0; i < hand1.length; i++) {
        const card1 = hand1[i];
        const card2 = hand2[i];
        const powerOfCard1 = getPowerOfCard(card1);
        const powerOfCard2 = getPowerOfCard(card2);
        if (powerOfCard1 > powerOfCard2) {
            return 1;
        }
        if (powerOfCard1 < powerOfCard2) {
            return -1;
        }
    }
    return 0;
}

const lines = input.split("\n");
const cardsData: [cards: string, bet: number][] = lines.map(line => {
    const [cards, bet] = line.split(/\s/);
    return [cards, Number(bet)] as [string, number];
});

cardsData.sort((a, b) => compareHands(a[0], b[0]));
const result = cardsData.reduce((acc, [_, bet], idx) => {
    return acc + (idx + 1) * bet;
}, 0);
console.log(result)
