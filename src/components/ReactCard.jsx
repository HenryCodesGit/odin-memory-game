/* eslint-disable react/prop-types */
import "./ReactCard.css"

export default function ReactCard({card, pickCard}){
    return(
        <button className="card" key={card.id} onClick={()=>{pickCard(card.name)}}>
            <img src={card.spriteURL} />
            <p>{card.name}</p>
        </button>
    )
}