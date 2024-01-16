import Card from "./Card.js";

export default class Deck {
    constructor(cards){
        this.cards = cards; //Array of 'Card's
    }

    //Asynchonously makes and returns a deck of random cards
    static getRandomDeckAsync(asyncCardFetcher, numCards){
        return asyncCardFetcher(numCards)
            .then((cards) => new Deck(cards.map((card)=>new Card(card))))
    }

    //Returns a randomized order array of the deck's cards
    deal(){
        //Make a shallow copy
        let output = [...this.cards]

        //Fisher-Yates Shuffle
        let currentIndex = output.length-1;
        let randomIndex;

        for (currentIndex; currentIndex >= 0; currentIndex -= 1){
            //Pick a random index up to the current index
            randomIndex = Math.floor(Math.random() * currentIndex);

            //Swap the values
            let temp = output[currentIndex];
            output[currentIndex] = output[randomIndex];
            output[randomIndex] = temp;
        }

        return output;
    }

    //Pass find to the child
    find(cardName){
        console.log('Attempting to find ' + cardName)
        return this.cards.find((card) => {
            console.log(`Current card is ${card.name}. Looking for ${cardName}`);
            return card.name === cardName
        });
    }
}