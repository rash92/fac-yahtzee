export default class DiceSet {
    // currently has 5 dice hardcoded, initially was considering powerups for extra dice so made it more generic if i want to extend in future. 
    // Would want to change to create elements and add as children to roll area instead of getting the element from the hardcoded html if i did this
    constructor(number_of_dice, colour){
        this.diceArray = []
        for (let i=1; i<=number_of_dice; i++){
            let diceElem = document.getElementById("dice"+i)
            this.diceArray.push(new Dice(diceElem, colour, this))
        }
        this.valueCounts = {"1":0, "2":0,"3":0,"4":0,"5":0,"6":0}
        this.scores = {"ones":0, "twos":0, "threes":0, "fours":0, "fives":0, "sixes":0, "threeOfAKind":0, "fourOfAKind":0, "fullHouse":0, "smallStraight":0, "largeStraight":0, "yahtzee":0, "chance":0}
        this.rolls = 0
    }

    //rolls all dice and then updates values
    rollDice(){
        for (let dice of this.diceArray){
            dice.roll()
        }
        this.rolls++
        this.countValues()
        this.updateScores()
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

    reset(){
        this.rolls = 0
        for (let dice of this.diceArray){
            dice.unlock()
        }
    }

}

class Dice {
    constructor(elem, colour, diceSet){
        this.diceSet = diceSet
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
        if(this.diceSet.rolls == 0){
            return
        }
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
    }
}
