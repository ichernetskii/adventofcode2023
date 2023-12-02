import {input} from "./02_data";

interface GameInfo {
    red?: number;
    green?: number;
    blue?: number;
}

const games = input
    .split("\n")
    .map(line => line.split(": ")[1].split(("; ")))
    .map(gamesInfo => {
        return gamesInfo.map(oneGameInfo => {
            return oneGameInfo
                .split(", ")
                .reduce<GameInfo>((acc, dieInfo) => {
                    const [number, color] = dieInfo.split(" ");
                    return ({
                        ...acc,
                        [color]: parseInt(number),
                    });
                }, {});
        })
    });

let sum = 0;
for (let gameIndex = 0; gameIndex < games.length; gameIndex++) {
    const minPower: GameInfo = {};
    for (const round of games[gameIndex]) {
        const {red, green, blue} = round;
        if (red !== undefined) {
            minPower.red = Math.max(minPower.red ?? 0, red);
        }
        if (green !== undefined) {
            minPower.green = Math.max(minPower.green ?? 0, green);
        }
        if (blue !== undefined) {
            minPower.blue = Math.max(minPower.blue ?? 0, blue);
        }
    }
    const power = Object.values(minPower).reduce((acc, value) => value ? acc * value : 0, 1);
    sum += power;
}

console.log(sum);
