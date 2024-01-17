/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Game from "../game/Game.js";
import ReactCard from "./ReactCard.jsx";

export default function ReactGame({numCards = 10, gameOverHandler = () => {}}){
    const game = useRef(new Game(numCards));
    const [cards, setNewCards] = useState();

    //The state doesn't matter. It just needs to change so it can trigger a new game
    const [newGame, setNewGame] = useState(false);

    //Initiate a new game
    useEffect(()=>{
        console.log('Remounting or newGame change');
        const controller = new AbortController();
        startNewGame(controller);
    
        //Cleanup 
        return () => controller.abort('Rerendering or unmounting')    
        },[newGame])

    function startNewGame(controller){
        game.current.startNewGameAsync(controller)
        .then(()=> setNewCards([...game.current.getRandomHand()].map((card) => <ReactCard key={card.id} card={card} pickCard={pickHandler} />)))
        .catch(console.log)
    }

    function restartGame(){setNewGame(!newGame);}
  
    function pickHandler(card){
      const newHand = game.current.pickCard(card); 
      if(newHand){
        setNewCards(newHand.map((card) => <ReactCard key={card.id} card={card} pickCard={pickHandler} />));
        return;
      }
      //New hand not received.. therefore gameover
      gameOverHandler(game.current.score, restartGame);
    }
  
    return (<>{cards}</>);
}