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
        let displayField = "";
        this.fieldArray.forEach(row => {
            displayField += row.join('') + '\n';
        });
        console.log(displayField);
    }

    askDirection() {
        console.log("You are here " + pathChar + ". \nWhich way would you like to move?")
        const userInput = prompt("[U/u: UP] [L/l: LEFT] [D/d: DOWN] [R/r: RIGHT]: ").toUpperCase();
        switch(userInput) {
            case "U":
                console.log("UP");
                break;
            case "L":
                console.log("LEFT");
                break;
            case "D":
                console.log("DOWN");
                break;
            case "R":
                console.log("RIGHT");
                break;
            default:
                breakline();
                borderMsg("INVALID CHOICE");
                breakline();
                this.askDirection();
                break;
        }
    }

    runGame() {

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

// HELPER FUNCTIONS
function borderMsg(msg) {
    const border = "=".repeat(msg.length);
    console.log(border);
    console.log(msg);
    console.log(border);
}

function breakline() {
    console.log("");
}

myField.print();
myField.askDirection();