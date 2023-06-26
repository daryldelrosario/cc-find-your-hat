const prompt = require('prompt-sync')();

// GAME PIECE VARIABLES
const hat = '\u{26D1}\u{FE0F} '.trimStart().padEnd(3);
const hole = '\u{26AB}'.trimStart();
const fieldChar = '\u{26D3} '.padEnd(2);
const pathChar = '\u{2728}';

class gameField {
    constructor(fieldArray) {
        this.fieldArray = fieldArray;
    }

    print() {
        const displayField = this.fieldArray.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayField);
    }
}

// TESTING CODE
const myField = new gameField([
    [pathChar, fieldChar, hole, fieldChar, fieldChar, fieldChar],
    [fieldChar, hat, fieldChar, hole, fieldChar, fieldChar],
    [fieldChar, fieldChar, fieldChar, fieldChar, fieldChar, fieldChar],
    [hat, fieldChar, fieldChar, hole, fieldChar, fieldChar],
    [fieldChar, fieldChar, hole, fieldChar, hole, fieldChar]
]);

console.log(myField);
myField.print();
