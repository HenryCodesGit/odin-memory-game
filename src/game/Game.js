import Deck from "./Deck";
import asyncCardFetcher from "./cardFetcher";
export default class Game{

    #deck;
    #gameOver = false;
    #score = 0;
    #numCards;
    get score(){
        return this.#score;
    }
    get numCards(){
        return this.#numCards;
    }
    constructor(numCards){
        this.#numCards = numCards;
    }

    getRandomHand(){
        if(!this.#deck) console.log('Loading...')
        else {
            return this.#deck.deal();
        }
    }

    pickCard(cardName){
        if(!this.#gameOver) this.#gameOver = !(this.#deck.find(cardName).pickCard());
        if(this.#gameOver || ++this.#score >= this.#numCards) return this.endGame();
        //this.#score += 1;
       
        //If game continues, return another hand
        return this.getRandomHand();
    }

    endGame(){
        console.log(`Game over! Your score is ${this.#score}`);
        return false;
    }

    startNewGameAsync(controller){
        this.#score = 0;
        this.#gameOver = false;
        
        return Deck.getRandomDeckAsync(asyncCardFetcher,this.numCards,controller)
            .then((deck) => {
                this.#deck = deck;
                return true;
            })
    }
}