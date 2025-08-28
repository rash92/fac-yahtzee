class Game {
    constructor(canvas, context) {
        this.dice = this.createDiceSet();
        this.scores = new ScoreCard;

        //other game level properties?


        //keyboard controls
        this.canvas.addEventListener("keydown", (e) => {
            console.log("keydown detected")
            if (e.key === " ") {
            // space to (re)roll dice?
            };
            if (e.key.toLowerCase() === "r"){
                // reset game
            }
            if (e.key === "Enter"){
                // finalize dice selection and go to scorecard
            }
            if (e.key === "1"){
                //toggle die 1
            }
            if (e.key === "2"){
                //toggle die 2
            }
            if (e.key === "3"){
                //toggle die 3
            }
            if (e.key === "4"){
                //toggle die 4
            }
            if (e.key === "5"){
                //toggle die 5
            }

            //etc
        });


    }

    createDiceSet(number_of_dice){
        diceSet = []
        for (let i = 1; i<=number_of_dice; i++){
           let diceElem = document.getElementById("dice"+i)
           diceSet.push(new Dice(diceElem))
        }

        return diceSet
    }

    render(deltaTime) {
        //fill in what to do every new frame
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.ctx.beginPath()
        this.ctx.lineWidth = "6"
        this.ctx.strokeStyle = "red"
        this.ctx.rect(100,100, 600,600)
        this.ctx.stroke()
        this.ctx.fillText("game will be in this canvas, current framerate: " + Math.floor(1000/deltaTime), 250,350)
    }
}

class ScoreCard {
    constructor(number_of_players){
        this.playerCount = number_of_players
        this.ones = 0
        this.twos = 0
        this.threes = 0
    }
}

class Dice {
    constructor(elem, colour){
        this.elem = elem
        this.value = 1
        this.colour = colour
        this.imagePath = "/images/dice/64px/"
        this.image = this.imagePath + this.colour + this.value + "-64.png"
    }

    changeValue(newValue){
        this.value = newValue
        this.image = this.imagePath + this.colour + this.value + "-64.png"
        //css/ animation stuff?
    }
}
