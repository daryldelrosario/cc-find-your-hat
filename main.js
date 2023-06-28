const prompt = require('prompt-sync')();

// GAME PIECE VARIABLES
const hat = '\u{26D1}\u{FE0F} '.trimStart().padEnd(3);
const hole = '\u{26AB}'.trimStart();
const grass = '\u{26D3} '.padEnd(2);
const userPath = '\u{2728}';

class gameField {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        this.field[0][0] = userPath; // reference this.field[y][x]
    }

    print() {
        let displayField = "";
        this.field.forEach(row => {
            displayField += row.join('') + '\n';
        });
        console.log(displayField);
    }

    askDirection() {
        console.log("Which way would you like to move?")
        const userInput = prompt("[U/u: UP] [R/r: RIGHT] [D/d: DOWN] [L/l: LEFT] [Q/q: Quit]: ").toUpperCase();
        switch(userInput) {
            case "U":
                this.locationY -= 1;
                return "UP";
            case "R":
                this.locationX += 1;
                return "RIGHT";
            case "D":
                this.locationY += 1;
                return "DOWN";
            case "L":
                this.locationX -= 1;
                return "LEFT";
            case "Q":
                breakline();
                borderMsg("THANK YOU FOR PLAYING - COME AGAIN");
                breakline();
                return "QUIT";
            default:
                breakline();
                borderMsg("INVALID CHOICE - TRY AGAIN");
                breakline();
                this.print();
                this.askDirection();
                break;
        }
    }

    isInBounds() {
        return (
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        );
    }

    isHat() {
        return this.field[this.locationY][this.locationX] === hat;
    }

    isHole() {
        return this.field[this.locationY][this.locationX] === hole;
    }

    isQuit(userInput) {
        return userInput === "QUIT"; 
    }

    runGame() {
        let playing = true;
        breakline();
        borderMsg("WELCOME TO 'FIND-YOUR-HAT' - YOU'RE STARTING POINT IS HERE: " + userPath);

        while(playing) {

            breakline();
            this.print();
            let userInput = this.askDirection();
            let direction = directionMsg(userInput);

            if(!this.isInBounds()) {
                breakline();
                borderMsg("OUT OF BOUNDS - GAME OVER");
                playing = false;
                break;
            } else if(this.isHat()) {
                breakline();
                borderMsg("YOU WIN - YOU FOUND A HAT");
                playing = false;
                break;
            } else if(this.isHole()) {
                breakline();
                borderMsg("YOU LOSE - YOU FELL IN A HOLE");
                playing = false;
                break;
            }

            if(this.isQuit(userInput)) {
                break;
            }

            breakline();
            borderMsg(direction);
            this.field[this.locationY][this.locationX] = userPath;
        }
    }
}

// TESTING CODE
const myField = new gameField([
    [grass, grass, hole, grass, grass, grass],
    [grass, hat, grass, hole, grass, grass],
    [grass, grass, grass, grass, grass, grass],
    [hat, grass, grass, hole, grass, grass],
    [grass, grass, hole, grass, hole, grass]
]);

function breakline() {
    console.log("");
}

function directionMsg(direction) {
    return "YOU'VE MOVED ONCE SPACE " + direction;
}

// HELPER FUNCTIONS
function borderMsg(msg) {
    const border = "=".repeat(msg.length);
    console.log(border);
    console.log(msg);
    console.log(border);
}

myField.runGame();