import {input} from "./08_data";

const [commands, stringMap] = input.split("\n\n");

type NavigationEntries = [value: string, [L: string, R: string]][];
type Navigation = Record<string, [L: string, R: string]>;

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

const FINISH = "ZZZ";
const walk = (initialPosition: string, navigation: Navigation, route: string): string => {
    let currentPosition = initialPosition;
    for (const direction of route) {
        currentPosition = navigation[currentPosition][direction === "L" ? 0 : 1];
    }
    return currentPosition;
}

let result = 0;
let position = "AAA";
while(true) {
    position = walk(position, navigationMapper, commands);
    result += commands.length;
    if (position === FINISH) {
        break;
    }
}

console.log(result);
