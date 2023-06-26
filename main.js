const prompt = require('prompt-sync')();

// GAME PIECE VARIABLES
const hat = '\u{26D1}\u{FE0F}';
const hole = '\u{26AB}';
const fieldChar = '\u{26D3}';
const pathChar = '\u{2728}';


class gameField {
    constructor(fieldArray) {
        this.fieldArray = fieldArray;
    }
}

// TESTING CODE
console.log("HAT: " + hat);
console.log("HOLE: " + hole);
console.log("FIELDCHAR: " + fieldChar);
console.log("PATHCHAR: " + pathChar);
