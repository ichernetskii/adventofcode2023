import {input} from "./05_data";
// destination range start, source range start, the range length.

const data = input.split("\n\n");
type Transform = [number, number, number];
// @ts-ignore
const readLine = (line: number): Transform[] => data[line].split(":\n")[1].trim().split("\n").map(line => line.split(/\s+/).map(Number));

const seeds = data[0].split(":")[1].trim().split(/\s+/).map(Number);
const transformersArray: Transform[][] = [];
for (let i = 1; i <= 7; i++) {
    const transformer = readLine(i);
    transformersArray.push(transformer);
}

const locations = seeds.map(seed => {
    let location = seed;
    for (let i = 0; i < transformersArray.length; i++) {
        const transformers = transformersArray[i];
        for(const transformer of transformers) {
            const [dest, source, length] = transformer;
            if (location >= source && location <= source + length - 1) {
                location = dest + (location - source);
                break;
            }
        }
    }
    return location;
});

console.log(Math.min(...locations));
