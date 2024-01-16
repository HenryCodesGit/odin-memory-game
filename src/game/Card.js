export default class Card{
    #id;
    #name;
    #spriteURL;
    #hasBeenPicked;
    
    /* Disallow setting new properties, only reading */
    get id(){return this.#id}
    get name(){return this.#name}
    get spriteURL(){return this.#spriteURL}

    constructor({id, name, spriteURL}){
        this.#id = id;
        this.#name = name;
        this.#spriteURL = spriteURL;
        this.#hasBeenPicked = false;
    }

    pickCard(){
        if(this.#hasBeenPicked) return false; //Disallow picking a card more than once

        this.#hasBeenPicked = true;
        return true;
    }
}