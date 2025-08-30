
class Hand {
    constructor(handId, scoreCard){
        this.scoreCard = scoreCard
        this.handId = handId
        this.rowElem = document.getElementById(handId)
        this.headerElem = this.rowElem.children[0]
        this.p1Elem = this.rowElem.children[1]
        this.p2Elem = this.rowElem.children[2]
        this.p3Elem = this.rowElem.children[3]
        this.p4Elem = this.rowElem.children[4]
        this.potential = this.rowElem.children[5]

    }

    checkSelectable(player){
        return !this["p"+player+"Elem"].classList.contains("unselectable")
    }

    showPotentialScore(newScore){
        this.potential.innerText = newScore
    }

    isUpdateable(currentPlayer){
        let cellElem = this["p"+currentPlayer+"Elem"]
        if(cellElem.classList.contains("unselectable")){
            return false
        }
        return true
    }

    updateScore(newScore, currentPlayer){
        let cellElem = this["p"+currentPlayer+"Elem"]
        cellElem.innerText = newScore
        cellElem.classList.add("unselectable")
    }

    reset(){
        for (let currentPlayer = 1; currentPlayer <= 4; currentPlayer++){
            this["p"+currentPlayer+"Elem"].innerText = 0
            this["p"+currentPlayer+"Elem"].classList.remove("unselectable")
        }
    }
}

export default class ScoreCard {
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
        if (this.game.diceSet.rolls == 0){
            this.game.ui.setPrompt("Need to roll first!")
            return
        }
        this.game.ui.hidePrompt()
        let newScore = this.game.getScore(hand)
        let currentPlayer = this.game.currentPlayer
        if (!this[hand].isUpdateable(currentPlayer)){
            this.game.ui.setPrompt("Please pick a hand you haven't picked already")
            return
        }
        this[hand].updateScore(newScore, currentPlayer)
        this.sum.updateScore(this.calculateSum(currentPlayer), currentPlayer)
        this.bonus.updateScore(this.calculateBonus(currentPlayer), currentPlayer)
        this.total.updateScore(this.calculateTotal(currentPlayer), currentPlayer)
        this.game.nextPlayer()
        this.checkGameOver()
    }

    checkGameOver(){
        let playerCount = this.game.players
        for (let hand of this.allowedHands){
            for (let player = 1; player <= playerCount; player++){
                if (this[hand].checkSelectable(player)){
                    return
                }
            }
        }

        this.game.ui.setPrompt("Game Over! Check total to see the score!")
    }

    calculateSum(player){
        let sum = 0
        for (let hand of this.upperChoosable){
            sum += Number(this[hand]["p"+player+"Elem"].innerText)
        }
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
        return total
    }

    updatePotentialHands(){
        for (let hand of this.choosableHands){
            this[hand].showPotentialScore(this.game.getScore(hand))
        }
    }

    reset(){
        for (let hand of this.allowedHands){
            this[hand].reset()
        }
    }
}
