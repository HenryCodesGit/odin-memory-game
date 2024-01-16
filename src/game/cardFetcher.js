/*
This function takes in a 'numCard' input and then outputs a Promise that resolves to a list of objects in the following format:
    [{id, name, spriteURL},
        {id, name, spriteURL},
        {id, name, spriteURL},
        ...etc up to 'numCard' number of times
    ]
*/

const NUM_POKEMON = 1025; //Current number of pokemon in existence

export default function asyncCardFetcher(numCards = 1){
    if(typeof numCards !== 'number' || (numCards < 1)) return new Promise.reject('Function takes in positive and non-zero integers only');

    let output = [];
    for(let i = 0; i<numCards; i++){
        const cardID = Math.floor(Math.random()*NUM_POKEMON+1);
        const url = `https://pokeapi.co/api/v2/pokemon/${cardID}`;
        const card = fetch(url)
        .then((response) => {
            if(!response.ok) return Promise.reject(`${response.status} : ${response.statusText}`)
            return response.json();
        })
        .then((data) => {
            const id = data.id;
            const name=data.name;
            const spriteURL=data.sprites.other.home['front_default'];
            return {id,name,spriteURL};
        })
        .catch((error) => {
            //Instead replace with 404?
            throw new Error(error);
        })

        output.push(card);
    }
    return Promise.all(output);
}