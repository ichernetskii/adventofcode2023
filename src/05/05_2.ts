import {input} from "./05_data";
// destination range start, source range start, the range length.

const data = input.split("\n\n");
type Transform = [destinationRangeStart: number, sourceRangeStart: number, rangeCount: number];
type Interval = [start: number, count: number];

// @ts-ignore
const readLine = (line: number): Transform[] => data[line].split(":\n")[1].trim().split("\n").map(line => line.split(/\s+/).map(Number));

const transformValue = (value: number, transforms: Transform[]): number => {
    for (const transform of transforms) {
        const [dest, source, length] = transform;
        if (value >= source && value <= source + length - 1) {
            return dest + (value - source);
        }
    }
    return value;
}

const transformIntervals = (interval: Interval, transforms: Transform[]): Interval[] => {
    let result: Interval[] = [];

    let startInterval = 0;
    let endInterval = 0;
    for (let i = interval[0]; i < interval[0] + interval[1]; i++) {
        const transformedI = transformValue(i, transforms);
        if (transformedI === endInterval + 1) {
            endInterval++;
        } else {
            if (endInterval > startInterval) {
                result.push([startInterval, endInterval - startInterval + 1]);
            }
            startInterval = transformedI;
            endInterval = transformedI;
        }
    }
    result.push([startInterval, endInterval - startInterval + 1]);

    return result;
}

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

const locations = seeds.map((seedInterval, idx) => {
    console.log(idx);
    let intervalArray = [seedInterval];

    for (let i = 0; i < transformersArray.length; i++){
        console.log(`${i}/${transformersArray.length - 1}`);
        const transformers = transformersArray[i];
        let newIntervalArray: Interval[] = [];
        for (const interval of intervalArray) {
            newIntervalArray.push(...transformIntervals(interval, transformers));
        }
        intervalArray = newIntervalArray;
    }
    return intervalArray;
});

console.log(Math.min(...locations.flat().map(interval => interval[0])));
