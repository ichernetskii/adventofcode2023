import {input} from "./06_data";

type RaceData = [time: number, distance: number];

const data = input.split("\n");
const times = data[0].split(/\s+/).slice(1).map(Number);
const distances = data[1].split(/\s+/).slice(1).map(Number);
const raceDataArray: RaceData[] = times.map((time, idx) => [time, distances[idx]]);

const getDistances = (raceData: RaceData): number[] => {
    const [time] = raceData;
    const result = [];
    for (let i = 0; i <= time; i++) {
        const speed = i;
        const remainedTime = time - i;
        const distance = speed * remainedTime;
        result.push(distance);
    }
    return result;
}

let variants = 1;
for (let raceNumber = 0; raceNumber < raceDataArray.length; raceNumber++) {
    const [_, distance] = raceDataArray[raceNumber];
    const distances = getDistances(raceDataArray[raceNumber]).filter(d => d > distance);
    variants *= distances.length;
}

console.log(variants);
