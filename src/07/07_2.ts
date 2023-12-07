import {input} from "./07_data";

type Card =  "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A";

const hasConfiguration = (hand: string, configuration: number[]): boolean => {
    // parse hand
    const parsedHand= hand
        .split("")
        .reduce<Record<Card, number>>((acc, card) => ({
            ...acc,
            [card]: (acc[card as Card] || 0) + 1,
        }), {} as Record<Card, number>);

    const {
        "J": jokersCount = 0,
        ...parsedHandWithoutJokers
    } = parsedHand;

    const cardsNeeded = configuration.slice().sort((a, b) => b - a);

    const cardsAvailable = Object.values(parsedHandWithoutJokers)
        .sort((a, b) => b - a)
        .slice(0, configuration.length);

    let  neededJokers = 0;
    for (let i = 0; i < cardsNeeded.length; i++) {
        if (cardsNeeded[i] > cardsAvailable[i]) {
            neededJokers += cardsNeeded[i] - cardsAvailable[i];
        }
    }

    return jokersCount >= neededJokers;
}

const hasPair = (hand: string) => hasConfiguration(hand, [2]);
const hasTwoPairs = (hand: string) => hasConfiguration(hand, [2, 2]);
const hasThree = (hand: string) => hasConfiguration(hand, [3]);
const hasFullHouse = (hand: string) => hasConfiguration(hand, [3, 2]);
const hasFour = (hand: string) => hasConfiguration(hand, [4]);
const hasFive = (hand: string) => hasConfiguration(hand, [5]);


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
            return 1;
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
console.log(result);
// 250636496
