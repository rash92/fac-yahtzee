class Game {
    constructor() {
        this.diceSet = new DiceSet(5, "black");
        this.rolls = 0
        this.players = 4
        this.currentPlayer = 1
        this.rulesShown = true
        this.playerButtonsShown = true
        this.scoreCard = new ScoreCard(this)
        this.setUpEventListenersOnButtons()

        // for now start with 1p
        this.setPlayers(2)
    }

    setUpEventListenersOnButtons(){
        document.getElementById("rollButton").addEventListener('click', ()=>this.rollDice())
        document.getElementById("toggle_players_buttons").addEventListener('click', ()=>this.toggleChangePlayers())
        for (let i=1; i<=4;i++){
            document.getElementById("set"+i+"p").addEventListener('click', ()=>this.setPlayers(i))
        }
        document.getElementById("submit").addEventListener('click', ()=>this.nextPlayer())
        document.getElementById("toggle_rules").addEventListener('click', ()=>this.toggleRules())
        let diceColours = ["black", "blue", "green", "purple", "red", "yellow"]
        for (let colour of diceColours){
            document.getElementById(colour).addEventListener('click', ()=> this.diceSet.changeColour(colour))
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

    rollDice(){
        this.diceSet.rollDice()
        this.scoreCard.updatePotentialHands(this.diceSet)
        this.rolls++
        console.log("rolled, current player: ", this.currentPlayer, " who is on roll number: ", this.rolls)
    }

    nextPlayer(){
        this.currentPlayer = (this.currentPlayer )% this.players + 1
        this.rolls = 0
        console.log("next player clicked, currentplayer is: ", this.currentPlayer, " out of: ", this.players)
    }

    getScore(hand){
        return this.diceSet.score[hand]
    }

    submitScore(){
        // should highlight which hands are clickable, make them able to be clicked,
        // change to next player and reset rolls so can't submit without rolling
        // change that cell to be locked so it can't be edited until restarting the game

        //temp to activate stuff to test
        this.scoreCard.updatePotentialHands(this.diceSet)

        this.rolls = 0
        this.nextPlayer()
    }

    calculateScores(){
        //should check current player,
        // look at current dice values and figure out which hands
        // are valid/ what scores you would get for each hand that has not been locked in yet.
        // if all hands have been submitted, calculate bonus/ total and prompt to restart.
    }
}


class Hand {
    constructor(handId, scoreCard){
        this.scoreCard = scoreCard
        this.handId = handId
        this.rowElem = document.getElementById(handId)
        // editing the elems with e.g. innerText will update the DOM, editing e.g. p1Score will not. It seems to be a copy of the value not a reference to the same thing.
        this.headerElem = this.rowElem.children[0]
        this.p1Elem = this.rowElem.children[1]
        this.p2Elem = this.rowElem.children[2]
        this.p3Elem = this.rowElem.children[3]
        this.p4Elem = this.rowElem.children[4]
        this.potential = this.rowElem.children[5]

        //eventListeners
        // this.headerElem.addEventListener('click', ()=>this.submitScore())
        // this.headerElem.addEventListener('click', ()=>{
        //     let dice = this.scoreCard.Dice();
        //     let value = calcValue(dice)
        //     this.scoreCard.Submit(handId, value)
        // })
    }

    submitScore(newScore, currentPlayer){
        console.log("trying to submit score after being clicked")
        this.updateScore(newScore,currentPlayer)
    }

    validForHand(diceValues, currentPlayer){
        switch(this.handId){
            case "ones":
                //
                break
            case "twos":
                //
                break
            case "threes":
                //
                break
            case "fours":
                //
                break
            case "fives":
                //
                break
            case "sixes":
                //
                break
            case "sum":
                //
                break
            case "bonus":
                //
                break
            case "threeOfAKind":
                //
                break
            case "fourOfAKind":
                //
                break
            case "fullHouse":
                //
                break
            case "smallStraight":
                //
                break
            case "largeStraight":
                //
                break
            case "yahtzee":
                //
                break
            case "chance":
                //
                break
            case "total":
                //
                break
            default:
                //
                console.log("invalid hand, you shouldn't be able to get here. ", this.handId, " is not a valid hand, valid handIds are: ", this.allowedHands)
        }
        
    }

    calculateScore(diceValues, currentPlayer){
        switch(diceValues){
            case "ones":
                //
                break
            case "twos":
                //
                break
            case "threes":
                //
                break
            case "fours":
                //
                break
            case "fives":
                //
                break
            case "sixes":
                //
                break
            case "sum":
                //
                break
            case "bonus":
                //
                break
            case "threeOfAKind":
                //
                break
            case "fourOfAKind":
                //
                break
            case "fullHouse":
                //
                break
            case "smallStraight":
                //
                break
            case "largeStraight":
                //
                break
            case "yahtzee":
                //
                break
            case "chance":
                //
                break
            case "total":
                //
                break
            default:
                //
                console.log("invalid hand, you shouldn't be able to get here. ", this.handId, " is not a valid hand, valid handIds are: ", this.allowedHands)
        }
    }

    showPotentialScore(newScore){
        this.potential.innerText = newScore
    }

    updateScore(newScore, currentPlayer){
        let cellElem = this["p"+currentPlayer+"Elem"]
        console.log("update score in hand called with inputs: ", newScore, currentPlayer)
        if(!cellElem.classList.contains("unselectable")){
            cellElem.innerText = newScore
        }
        if (this.scoreCard.choosableHands.includes(this.handId)){

            cellElem.classList.add("unselectable")
        }
        
    }

    reset(){
        this["p"+currentPlayer+"Elem"].innerText = 0
        this["p"+currentPlayer+"Elem"].classList.remove("unselectable")
    }
}

class ScoreCard {
    constructor(game){
        this.game = game
        this.allowedHands = ["ones", "twos", "threes", "fours", "fives", "sixes", "sum", "bonus", "threeOfAKind", "fourOfAKind", "fullHouse", "smallStraight", "largeStraight", "yahtzee", "chance", "total"]
        this.derivedHands = ["sum", "bonus", "total"]
        this.choosableHands = ["ones", "twos", "threes", "fours", "fives", "sixes", "threeOfAKind", "fourOfAKind", "fullHouse", "smallStraight", "largeStraight", "yahtzee", "chance"]
        this.upperChoosable = ["ones", "twos", "threes", "fours", "fives", "sixes"]
        this.lowerChoosable = ["threeOfAKind", "fourOfAKind", "fullHouse", "smallStraight", "largeStraight", "yahtzee", "chance"]
        for (let hand of this.allowedHands){
            this[hand] = new Hand(hand, this)
        }
        for (let hand of this.choosableHands){
            this[hand].headerElem.addEventListener('click', ()=>this.submitScore(hand))
        }
    }

    submitScore(hand){
        let newScore = this.game.getScore(hand)
        let currentPlayer = this.game.currentPlayer
        console.log("in scorecard method to update score, hand passed in is: ", hand, " score to add is: ", newScore, "currentPlayerRecieved is: ", currentPlayer)
        this[hand].updateScore(newScore, currentPlayer)
        this.checkGameOver()
        this.sum.updateScore(this.calculateSum(currentPlayer), currentPlayer)
        this.bonus.updateScore(this.calculateBonus(currentPlayer), currentPlayer)
        this.total.updateScore(this.calculateTotal(currentPlayer), currentPlayer)
    }

    checkGameOver(){

    }

    calculateSum(player){
        let sum = 0
        for (let hand of this.upperChoosable){
            sum += Number(this[hand]["p"+player+"Elem"].innerText)
        }
        console.log("calculated sum as: ", sum)
        return sum
    }

    calculateBonus(player){
        return this.calculateSum(player) >= 63 ? 35 : 0
    }

    calculateTotal(player){
        let total = 0
        for (let hand of this.choosableHands){
            total += Number(this[hand]["p"+player+"Elem"].innerText)
        }
        total += this.calculateBonus(player)
        console.log("calculated total as: ", total)
        return total
    }

    updatePotentialHands(diceSet){
        for (let hand of this.choosableHands){
            this[hand].showPotentialScore(this.game.getScore(hand))
        }
    }
}

class DiceSet {
    // currently has 5 dice hardcoded, initially was considering powerups for extra dice so made it more generic if i want to extend in future. 
    // Would want to change to create elements and add as children to roll area instead of getting the element from the hardcoded html if i did this
    constructor(number_of_dice, colour){
        this.diceArray = []
        for (let i=1; i<=number_of_dice; i++){
            let diceElem = document.getElementById("dice"+i)
            this.diceArray.push(new Dice(diceElem, colour))
        }
        this.valueCounts = {"1":0, "2":0,"3":0,"4":0,"5":0,"6":0}
        this.scores = {"ones":0, "twos":0, "threes":0, "fours":0, "fives":0, "sixes":0, "threeOfAKind":0, "fourOfAKind":0, "fullHouse":0, "smallStraight":0, "largeStraight":0, "yahtzee":0, "chance":0}

    }

    //rolls all dice and then updates values
    rollDice(){
        for (let dice of this.diceArray){
            dice.roll()
        }
        this.countValues()
        this.updateScores()
        console.log("rolled all dice, values are: ", this.valueCounts, " with scores: ", this.scores)
    }

    updateScores(){
        this.scores.ones = this.onesScore()
        this.scores.twos = this.twosScore()
        this.scores.threes = this.threesScore()
        this.scores.fours = this.foursScore()
        this.scores.fives = this.fivesScore()
        this.scores.sixes = this.sixesScore()
        this.scores.threeOfAKind = this.threeOfAKindScore()
        this.scores.fourOfAKind = this.fourOfAKindScore()
        this.scores.fullHouse = this.fullHouseScore()
        this.scores.smallStraight = this.smallStraightScore()
        this.scores.largeStraight = this.largeStraightScore()
        this.scores.yahtzee = this.yahtzeeScore()
        this.scores.chance = this.chanceScore()
    }

    sum(){
        let total = 0
        for (let dice of this.diceArray){
            total += dice.value
        }
        return total
    }

    sumForValue(value){
        total = 0
        for (let dice of this.diceArray){
            total += dice.value == value?value:0
        }
        return total
    }

    //both updates and returns the valueCounts
    countValues(){
        this.valueCounts = {"1":0, "2":0,"3":0,"4":0,"5":0,"6":0}
        // maybe bad idea to use type coersion to go from int to string
        for (let dice of this.diceArray){
            this.valueCounts[dice.value] += 1
        }
        return this.valueCounts
    }

    // for 'upper section', adds up dice with a specific value
    onesScore(){
        return this.sumForValue(1)
    }

    twosScore(){
        return this.sumForValue(2)
    }

    threesScore(){
        return this.sumForValue(3)
    }

    foursScore(){
        return this.sumForValue(4)
    }

    fivesScore(){
        return this.sumForValue(5)
    }

    sixesScore(){
        return this.sumForValue(6)
    }

    //checks if three of a kind exists, but score is actually sum of ALL dice. 0 otherwise.
    threeOfAKindScore(){
        for (let value in this.valueCounts){
            if (this.valueCounts[value] >=3){
                return this.sum()
            }
        }
        return 0
    }

    //checks if four of a kind exists, but score is actually sum of ALL dice. 0 otherwise.
    fourOfAKindScore(){
        for (let value in this.valueCounts){
            if (this.valueCounts[value] >=4){
                return this.sum()
            }
        }
        return 0
    }

    //always scores 25 if it's a full house, 0 if not. yahtzee also counts as full house.
    fullHouseScore(){
        let double = false
        let triple = false
        for (let value in this.valueCounts){
            // yahtzee counts as full house automatically. >= rather than == to allow for if we extend to have more than 5 dice so e.g. 3 fives and 3 sixes would still count
            if (this.valueCounts[value] >= 5){
                triple = true
                double = true
            } else if (!triple && this.valueCounts[value] >= 3){
                triple = true
            } else if (this.valueCounts[value] >= 2){
                double = true
            }
        }
        return double && triple?25:0
    }

    //always score 30 if small straight exists, 0 otherwise.
    smallStraightScore(){
        // only three options so did them explicitly. considered looping through object but object keys aren't guaranteed to be in order.
        if (this.valueCounts["1"] && this.valueCounts["2"] && this.valueCounts["3"] && this.valueCounts["4"] || 
            this.valueCounts["2"] && this.valueCounts["3"] && this.valueCounts["4"] && this.valueCounts["5"] ||
            this.valueCounts["3"] && this.valueCounts["4"] && this.valueCounts["5"] && this.valueCounts["6"] ){
            return 30
        }
        return 0
    }

    //always score 40 if large straight exists, 0 otherwise.
    largeStraightScore(){
        //only two options so did them explicitly
        if ( this.valueCounts["1"] && this.valueCounts["2"] && this.valueCounts["3"] && this.valueCounts["4"] && this.valueCounts["5"] ||
            this.valueCounts["2"] && this.valueCounts["3"] && this.valueCounts["4"] && this.valueCounts["5"] && this.valueCounts["6"]){
            return 40
        }
        return 0

    }

    //same as five of a kind. always score 50 if it exists, 0 otherwise.
    yahtzeeScore(){
        for (let value in this.valueCounts){
            if (this.valueCounts[value] >=5){
                return 50
            }
        }
        return 0
    }

    //just the sum of all dice, no special requirements
    chanceScore(){
        return this.sum()
    }

    changeColour(newColour){
        for (let dice of this.diceArray){
            dice.changeColour(newColour)
        }
    }

}

class Dice {
    constructor(elem, colour){
        this.elem = elem
        this.value = 1
        this.colour = colour
        this.locked = false
        this.imagePath = "images/dice/64px/"
        this.image = this.imagePath + this.colour + this.value + "-64.png"
        this.elem.addEventListener('click',()=>this.toggleLock())
    }

    roll(){
        if (this.locked){
            return
        }
        let newValue = Math.ceil(Math.random()*6)
        this.changeValue(newValue)
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

    changeColour(newColour){
        this.colour = newColour
        this.image = this.imagePath + this.colour + this.value + "-64.png"
        this.elem.src = this.image
        console.log("trying to change colour")
    }
}

window.addEventListener("load", ()=>{
    const game = new Game()
})

// TODO: set up checking if you've made too many rolls and disabling rolling when that happens, swapping between players after submitting a score and making clear whose turn it is, maybe extracting buttons to separate classes instead of directly in game class, separating stuff into files.