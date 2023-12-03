import {input} from "./03_data";

const data = input.split("\n");
const field = data.map(line => line.split(""));

const isSymbol = (char: string) => /^[^0-9.]$/.test(char);
const isDigit = (char: string) => /^[0-9]$/.test(char);

// if it's not a number of detail => returns ""
// if it's a number of detail => returns number
const isNumberOfDetail = (data: string[][], startX: number, startY: number): string => {
    // data[startY][startX] should be digit
    // Calculate length of number
    // . . . N X Y Z . . .
    let length = 1;
    let number = data[startY][startX];
    while (isDigit(data[startY][startX + length])) {
        number += data[startY][startX + length];
        length++;
    }

    for (let j = startY - 1; j <= startY + 1; j++) {
        if (data[j]) {
            for (let i = startX - 1; i <= startX + length; i++) {
                if (isSymbol(data[j][i])) {
                    return number;
                }
            }
        }
    }
    return "";
}

let sum = 0;
for (let j = 0; j < field.length; j++) {
    for (let i = 0; i < field[j].length; i++) {
        if (isDigit(field[j][i])) {
            const stringWithNumber = isNumberOfDetail(field, i, j);
            if (stringWithNumber !== "") {
                i += stringWithNumber.length - 1;
                sum += parseInt(stringWithNumber);
            }
        }
    }
}

console.log(sum);
