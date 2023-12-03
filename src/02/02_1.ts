import {input} from "./02_data";

interface GameInfo {
    red?: number;
    green?: number;
    blue?: number;
}

const maxDices = {
    red: 12,
    green: 13,
    blue: 14,
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
    const isValid = games[gameIndex].every(gameInfo => {
        return (Object.keys(maxDices) as unknown as Array<keyof GameInfo>)
            .every(key  => (gameInfo[key] ?? maxDices[key]) <= maxDices[key]);
    });
    if (isValid) {
        sum += gameIndex + 1;
    }
}

console.log(sum);
