
export default class UI {
    constructor(game){
        this.game = game
        this.rollButton = document.getElementById("rollButton")
        this.resetButton = document.getElementById("resetButton")
        this.toggleRulesButton = document.getElementById("toggleRulesButton")
        this.rulesElem = document.getElementById("rules")
        this.rulesShown = true
        this.playerButtonsShown = true
        this.toggleNumberOfPlayersButton = document.getElementById("togglePlayersButton")
        for (let i=1; i<=4;i++){
            this["set"+i+"p"] = document.getElementById("set"+i+"p")
        }
        this.diceColours = ["black", "blue", "green", "purple", "red", "yellow"]
        for (let colour of this.diceColours){
            this[colour+"DiceButton"] = document.getElementById(colour)
        }
        this.promptButton = document.getElementById("prompt")
        this.setUpEventListenersOnButtons()

    }
    
    setUpEventListenersOnButtons(){
        this.rollButton.addEventListener('click', ()=>this.game.rollDice())
        this.toggleNumberOfPlayersButton.addEventListener('click', ()=>this.toggleChangePlayers())
        for (let i=1; i<=4;i++){
            this["set"+i+"p"].addEventListener('click', ()=>this.setPlayers(i))
        }
        this.resetButton.addEventListener('click', ()=>this.game.reset())
        this.toggleRulesButton.addEventListener('click', ()=>this.toggleRules())
        for (let colour of this.diceColours){
            this[colour+"DiceButton"].addEventListener('click', ()=> this.game.diceSet.changeColour(colour))
        }
        this.promptButton.addEventListener('click', ()=>this.hidePrompt())
    }
    
    setPrompt(text){
        this.promptButton.innerText = text
        this.showPrompt()
    }

    hidePrompt(){
        this.promptButton.classList.add("hidden")
    }

    showPrompt(){
        this.promptButton.classList.remove("hidden")
    }

    toggleRules(){
        if (this.rulesShown){
            this.rulesElem.classList.add("hidden")
            this.toggleRulesButton.innerText = "show rules"
        }else{
            this.rulesElem.classList.remove("hidden")
            this.toggleRulesButton.innerText = "hide rules"
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
        this.game.players = number_of_players
        for (let i=number_of_players+1; i<=4; i++){
            Array.from(document.getElementsByClassName("player"+i)).forEach(element => {
                element.classList.add("hidden")
            });
        }
        for (let i=1; i<= number_of_players; i++){
            Array.from(document.getElementsByClassName("player"+i)).forEach(element => {
                element.classList.remove("hidden")
            });
        }
        this.toggleChangePlayers()
        this.game.reset()
    }

}

