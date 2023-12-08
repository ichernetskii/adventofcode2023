import {input} from "./08_data";

const [commands, stringMap] = input.split("\n\n");

type NavigationEntries = [value: string, [L: string, R: string]][];
type Navigation = Record<string, [L: string, R: string]>;

const LCM = (numbers: number[]) => {
    const max = Math.max(...numbers);
    let result = max;
    while (true) {
        const isDivisible = numbers.every(number => result % number === 0);
        if (isDivisible) {
            return result;
        }
        result += max;
    }
}

// [ ["AAA", ["BBB", "CCC"]], ...]
const navigationEntries = stringMap
    .split("\n")
    .map(line => line
        .split(" = ")
        .map((item, idx) => {
            if (idx === 0) return item;
            return item.slice(1, -1).split(", ") as [L: string, R: string];
        })
    ) as NavigationEntries;

// { "AAA": ["BBB", "CCC"], ...}
const navigationMapper: Navigation = Object.fromEntries(navigationEntries);

const initialPositions = Object.keys(navigationMapper).filter(key => key[2] === "A");
const isFinish = (position: string) => position[2] === "Z";

const walk = (initialPosition: string, navigation: Navigation, route: string): string => {
    let currentPosition = initialPosition;
    for (const direction of route) {
        currentPosition = navigation[currentPosition][direction === "L" ? 0 : 1];
    }
    return currentPosition;
}

let results: number[] = [];
let positions = [...initialPositions];
const commandsLength = commands.length;

for (let i = 0; i < positions.length; i++) {
    while (true) {
        positions[i] = walk(positions[i], navigationMapper, commands);
        results[i] = (results[i] ?? 0) + commandsLength;
        if (isFinish(positions[i])) {
            break;
        }
    }
}

console.log(LCM(results));
