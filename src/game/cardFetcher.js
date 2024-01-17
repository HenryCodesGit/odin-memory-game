/*
This function takes in a 'numCard' input and then outputs a Promise that resolves to a list of objects in the following format:
    [{id, name, spriteURL},
        {id, name, spriteURL},
        {id, name, spriteURL},
        ...etc up to 'numCard' number of times
    ]
*/

const NUM_POKEMON = 1025; //Current number of pokemon in existence

export default function asyncCardFetcher(numCards = 1, controller){
    if(typeof numCards !== 'number' || (numCards < 1)) return new Promise.reject('Function takes in positive and non-zero integers only');

    const signal = controller.signal;

    let output = [];

    //Non-repeating array of IDs to pull from the server
    const cardIDs = [];
    while(cardIDs.length < numCards){
        const cardID = Math.floor(Math.random()*NUM_POKEMON+1);
        if(!cardIDs.find((id)=>cardID===id)) cardIDs.push(cardID);
    }
    
    cardIDs.forEach((cardID)=>{
            const url = `https://pokeapi.co/api/v2/pokemon/${cardID}`;
            const card = fetch(url, {
                method: 'get',
                signal: signal
            })
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
    })
    return Promise.all(output);
}