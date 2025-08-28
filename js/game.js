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

    createDiceSet(){
        d1 = new Dice()
        d2 = new Dice()
        d3 = new Dice()
        d4 = new Dice()
        d5 = new Dice()

        return [d1,d2,d3,d4,d5]
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

}

class Dice {

}
