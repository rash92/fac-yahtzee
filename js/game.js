class Game {
    constructor(canvas, context) {
        this.dice = this.createDiceSet(5, "black");
        this.scores = new ScoreCard;
        this.rolls = 0
        this.players = 1
        this.currentPlayer = 1
        this.setUpEventListenersOnButtons()
        //other game level properties?
    }

    setUpEventListenersOnButtons(){
        document.getElementById("rollButton").addEventListener('click', ()=>this.rollUnlockedDice())
        document.getElementById("set1p").addEventListener('click', ()=>this.changePlayers(1))
        document.getElementById("set2p").addEventListener('click', ()=>this.changePlayers(2))
        document.getElementById("set3p").addEventListener('click', ()=>this.changePlayers(3))
        document.getElementById("set4p").addEventListener('click', ()=>this.changePlayers(4))
        document.getElementById("submit").addEventListener('click', ()=>this.submitScore())

    }

    changePlayers(number_of_players){
        this.players = number_of_players
        this.setPlayers()
    }

    setPlayers(){
        for (let i=this.players+1; i<=4; i++){
            Array.from(document.getElementsByClassName("player"+i)).forEach(element => {
                element.classList.add("hidden")
            });
        }
        for (let i=1; i<= this.players; i++){
            Array.from(document.getElementsByClassName("player"+i)).forEach(element => {
                element.classList.remove("hidden")
            });
        }
    }

    changeColour(newColour){
        this.dice = this.createDiceSet(5, newColour)
    }

    rollUnlockedDice(){
        console.log("rolling unlcoked dice, set of dice: ", this.dice)
        for (let die of this.dice){
            console.log("looping over dice, current die: ", die)
            die.roll()
        }
        this.rolls++
        console.log(this.rolls)
    }

    createDiceSet(number_of_dice, colour){
        console.log("creating dice set")
        let diceSet = []
        for (let i = 1; i<=number_of_dice; i++){
           let diceElem = document.getElementById("dice"+i)
           let diceObj = new Dice(diceElem, colour)
           diceSet.push(diceObj)
           console.log("added dice to array: ", diceElem, diceObj )
        }
        console.log("after dice set creation loop: ", diceSet)
        return diceSet
    }

    submitScore(){
        console.log("attempting to submit score")
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
        this.locked = false
        this.imagePath = "/images/dice/64px/"
        this.image = this.imagePath + this.colour + this.value + "-64.png"
        this.elem.addEventListener('click',()=>this.toggleLock())
    }

    roll(){
        console.log("trying to roll die")
        if (this.locked){
            return
        }
        let newValue = Math.ceil(Math.random()*6)

        this.changeValue(newValue)
        console.log("after roll, value: ", newValue, " die object: ", this)
    }

    lock(){
        this.locked = true
        this.elem.classList.add('locked')
    }

    unlock(){
        this.locked = false
        this.elem.classList.remove('locked')
    }

    toggleLock(){
        console.log("toggle lock triggered", this.locked, this.lock, this)
        if (this.locked){
            this.unlock()
        }else{
            this.lock()
        }
    }

    changeValue(newValue){
        this.value = newValue
        this.image = this.imagePath + this.colour + this.value + "-64.png"
        this.elem.src = this.image
        //css/ animation stuff?
    }
}

window.addEventListener("load", ()=>{
    const game = new Game()
    console.log("game created: ", game)

})

let game = new Game()
