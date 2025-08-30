import UI from "./ui.js"
import DiceSet from "./dice.js"
import ScoreCard from "./scorecard.js"

class Game {
    constructor() {
        this.diceSet = new DiceSet(5, "black");
        this.scoreCard = new ScoreCard(this)
        this.ui = new UI(this)
        this.rolls = 0
        this.players = 4
        this.setCurrentPlayer(1)
    }

    reset(){
        this.rolls = 0
        this.setCurrentPlayer(1)
        this.scoreCard.reset()
    }

    rollDice(){
        if (this.rolls >= 3){
            this.ui.setPrompt("Max 3 rolls, need to submit your score! Pick a hand")
            return
        }
        this.ui.hidePrompt()
        this.diceSet.rollDice()
        this.scoreCard.updatePotentialHands(this.diceSet)
        this.rolls++
    }

    nextPlayer(){
        this.rolls = 0
        this.setCurrentPlayer(this.currentPlayer % this.players + 1)
    }

    setCurrentPlayer(player){
        Array.from(document.getElementsByClassName("currentPlayer")).forEach(elem => elem.classList.remove("currentPlayer"))
        Array.from(document.getElementsByClassName("player"+player)).forEach(elem => elem.classList.add("currentPlayer"))
        this.currentPlayer = player
    }

    getScore(hand){
        return this.diceSet.scores[hand]
    }

}

window.addEventListener("load", ()=>{
    const game = new Game()
})
