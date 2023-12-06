import {input} from "./05_data";

const data = input.split("\n\n");
type Transform = [destinationRangeStart: number, sourceRangeStart: number, rangeCount: number];
type Interval = [start: number, count: number];

// @ts-ignore
const readLine = (line: number): Transform[] => data[line].split(":\n")[1].trim().split("\n").map(line => line.split(/\s+/).map(Number));

const seedsBorders = data[0].split(":")[1].trim().split(/\s+/).map(Number);
const seeds: Interval[] = [];
for (let i = 0; i < seedsBorders.length; i = i + 2) {
    seeds.push([seedsBorders[i], seedsBorders[i + 1]]);
}
const transformersArray: Transform[][] = [];
for (let i = 1; i <= 7; i++) {
    const transformer = readLine(i);
    transformersArray.push(transformer);
}
const reversedTransformersArray = transformersArray.slice().reverse();

const getSeedByLocation = (location: number): number => {
    let result = location;
    for (const transformers of reversedTransformersArray) {
        for (const transformer of transformers) {
            const [dest, source, length] = transformer;
            if (result >= dest && result <= dest + length - 1) {
                result += source - dest;
                break;
            }
        }
    }
    return result;
}

for (let i = 0; i < 1E10; i++) {
    const seed = getSeedByLocation(i);

    // check seed
    let exists = false;
    for (const seedInterval of seeds) {
        if (seed >= seedInterval[0] && seed <= seedInterval[0] + seedInterval[1] - 1) {
            exists = true;
            break;
        }
    }
    if (exists) {
        console.log(i);
        break;
    }
}
