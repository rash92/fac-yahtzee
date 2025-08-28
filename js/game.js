class Game {
    constructor(canvas, context) {
        this.dice = this.createDiceSet(5, "black");
        this.scores = new ScoreCard;
        this.rolls = 0
        this.players = 4
        this.currentPlayer = 1
        this.rulesShown = true
        this.playerButtonsShown = true
        this.ScoreCard = new ScoreCard()
        this.setUpEventListenersOnButtons()
    }

    setUpEventListenersOnButtons(){
        document.getElementById("rollButton").addEventListener('click', ()=>this.rollUnlockedDice())
        document.getElementById("toggle_players_buttons").addEventListener('click', ()=>this.toggleChangePlayers())
        for (let i=1; i<=4;i++){
            document.getElementById("set"+i+"p").addEventListener('click', ()=>this.setPlayers(i))
        }
        document.getElementById("submit").addEventListener('click', ()=>this.submitScore())
        document.getElementById("toggle_rules").addEventListener('click', ()=>this.toggleRules())
        console.log("looping through scorecard", this.ScoreCard)
        for (let key in this.ScoreCard){
            let hand = this.ScoreCard[key].children[0]
            //adding click event listener to the name of the hand, which should then submit
            // the score if it can for the cell of that hand for the current player.
            hand.addEventListener('click', ()=>this.selectHand(hand.innerText))
            console.log(hand)
        }

    }

    selectHand(hand){
        console.log("tried to select hand: ", hand, "for event: ", e.target)
        for ( let die of this.dice){
            console.log("trying to score with: ", die.value)
        }
    }

    toggleRules(){
        let rulesElem = document.getElementById("rules")
        let rulesButton = document.getElementById("toggle_rules")
        if (this.rulesShown){
            rulesElem.classList.add("hidden")
            rulesButton.innerText = "show rules"
        }else{
            rulesElem.classList.remove("hidden")
            rulesButton.innerText = "hide rules"
        }
        this.rulesShown = !this.rulesShown
    }

    toggleChangePlayers(){
        if (this.playerButtonsShown){
            for (let i=1; i<=4;i++){
                document.getElementById("set"+i+"p").classList.add("hidden")
            }
            this.playerButtonsShown = false
        } else {
            for (let i=1; i<=4;i++){
                document.getElementById("set"+i+"p").classList.remove("hidden")
            }
            this.playerButtonsShown = true
        }
    }

    setPlayers(number_of_players){
        this.players = number_of_players
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
        this.toggleChangePlayers()
    }

    changeColour(newColour){
        this.dice = this.createDiceSet(5, newColour)
    }

    rollUnlockedDice(){
        for (let die of this.dice){
            die.roll()
        }
        this.rolls++
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
        // should highlight which hands are clickable, make them able to be clicked,
        // change to next player and reset rolls so can't submit without rolling
        // change that cell to be locked so it can't be edited until restarting the game
        console.log("attempting to submit score for player: ", this.currentPlayer)
        this.rolls = 0
        this.currentPlayer = (this.currentPlayer) % (this.players)+1
        console.log("changed to player: ", this.currentPlayer)
    }

    calculateScores(){
        //should check current player,
        // look at current dice values and figure out which hands
        // are valid/ what scores you would get for each hand that has not been locked in yet.
        // if all hands have been submitted, calculate bonus/ total and prompt to restart.
    }
}

class ScoreCard {
    constructor(){
        // each of these is a row from the scorecard, to access individual cells,
        // do <key>.children[i] with i=0 for name of hand and i=1,2,3,4 for that player's score for that hand
        this.ones = document.getElementById("ones")
        this.twos = document.getElementById("twos")
        this.threes = document.getElementById("threes")
        this.fours = document.getElementById("fours")
        this.fives = document.getElementById("fives")
        this.sixes = document.getElementById("sixes")
        this.sum = document.getElementById("sum")
        this.bonus = document.getElementById("bonus")
        this.threeOfAKind = document.getElementById("3_of_a_kind")
        this.fourOfAKind = document.getElementById("4_of_a_kind")
        this.fullHouse = document.getElementById("full_house")
        this.smallStraight = document.getElementById("small_straight")
        this.largeStraight = document.getElementById("large_straight")
        this.yahtzee = document.getElementById("yahtzee")
        this.chance = document.getElementById("chance")
        this.total = document.getElementById("total")
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
