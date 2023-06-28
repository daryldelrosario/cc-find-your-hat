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

    static generateField(height, width, percentage = 0.1) {
        const field = [];
        const totalTiles = height * width;
        const totalHoles = Math.floor(totalTiles * percentage);

        for(let i = 0; i < height; i++) {
            field.push([]);
            for(let j = 0; j < width; j++) {
                field[i].push(grass);
            }
        }

        const hatX = Math.floor(Math.random() * width);
        const hatY = Math.floor(Math.random() * height);
        field[hatY][hatX] = hat;

        let holesPlaced = 0;
        while(holesPlaced < totalHoles) {
            const holeY = Math.floor(Math.random() * width);
            const holeX = Math.floor(Math.random() * height);

            if(field[holeY][holeX] !== hat && field[holeY][holeX] !== hole) {
                field[holeY][holeX] = hole;
                holesPlaced++;
            }
        }
        
        return field;
    }

    print() {
        let displayField = "";
        this.field.forEach(row => {
            displayField += row.join('') + '\n';
        });
        console.log(displayField);
    }
}

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

function directionMsg(direction) {
    return "YOU'VE MOVED ONCE SPACE " + direction;
}

// TESTING CODE
const myField = new gameField(gameField.generateField(10, 10, 0.2));
myField.runGame();