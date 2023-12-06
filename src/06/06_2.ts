import {input} from "./06_data";

type RaceData = [time: number, distance: number];

const data = input.split("\n");
const time = parseInt(data[0].split("").filter(c => c.match(/\d/)).join(""));
const distance = parseInt(data[1].split("").filter(c => c.match(/\d/)).join(""));

const getWinsCount = (raceData: RaceData): number => {
    let wins = 0;
    const [time, distance] = raceData;
    for (let i = 0; i <= time; i++) {
        const speed = i;
        const remainedTime = time - i;
        const currentDistance = speed * remainedTime;
        if (currentDistance > distance) {
            wins++;
        }
    }
    return wins;
}

console.log(getWinsCount([time, distance]));
