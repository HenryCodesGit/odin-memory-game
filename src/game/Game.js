import Deck from "./Deck";
import asyncCardFetcher from "./cardFetcher";
export default class Game{

    #deck;
    #gameOver = false;
    constructor(numCards){
        this.numCards = numCards;
        this.startNewGame();
    }

    getRandomHand(){
        if(!this.#deck) console.log('Loading...')
        else {
            return this.#deck.deal();
        }
    }

    pickCard(cardName){
        this.#gameOver = !(this.#deck.find(cardName).pickCard());
    }

    startNewGame(){
        Deck.getRandomDeckAsync(asyncCardFetcher,this.numCards)
            .then((deck) => {
                this.#deck = deck;
            })
    }

    //Tempory loop for now that tracks progress of the game
    loop(){
        if(this.#gameOver) return console.log('Game over!');

        let names = [...this.getRandomHand()].map((item) => item.name)
        console.log(names);
        
        let nextCard = prompt('Please select a card');
        this.pickCard(nextCard);

        this.loop()
    }

}