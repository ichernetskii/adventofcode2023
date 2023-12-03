import {input} from "./03_data";

const data = input.split("\n");
const field = data.map(line => line.split(""));

const isDigit = (char: string) => /^[0-9]$/.test(char);

const getNumbers = (data: string[][], x: number, y: number): number[] => {
    let neighbours: { x: number; y: number; char: string }[] = [];
    for (let j = y - 1; j <= y + 1; j++) {
        if (data[j]) {
            for (let i = x - 1; i <= x + 1; i++) {
                if (isDigit(data[j][i])) {
                    neighbours.push({x: i, y: j, char: data[j][i]});
                }
            }
        }
    }

    const numbers: number[] = [];
    while (neighbours.length > 0) {
        const neighbour = neighbours.pop()!;
        let deltaStart = 0;
        let deltaEnd = 0;
        while(isDigit(data[neighbour.y][neighbour.x + deltaStart - 1])) {
            deltaStart--;
        }
        while(isDigit(data[neighbour.y][neighbour.x + deltaEnd + 1])) {
            deltaEnd++;
        }

        let str = "";
        for (let i = neighbour.x + deltaStart; i <= neighbour.x + deltaEnd; i++) {
            str += data[neighbour.y][i];

            // remove already processed items from neighbours array
            neighbours = neighbours.filter(n => !(n.x == i && n.y == neighbour.y));
        }

        numbers.push(parseInt(str));
    }


    return numbers;
}

let sum = 0;
for (let j = 0; j < field.length; j++) {
    for (let i = 0; i < field[j].length; i++) {
        const char = field[j][i];
        if (char === "*") {
            const numbers = getNumbers(field, i, j);
            if (numbers.length === 2) {
                sum += numbers[0] * numbers[1];
            }
        }
    }
}

console.log(sum);
