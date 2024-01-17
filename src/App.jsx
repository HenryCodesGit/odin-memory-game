import "./App.css";

import ReactGame from "./components/ReactGame";
function App() {

  const maxCards = 5;

  function onGameOver(score, restartCallback){
    if(confirm(`Game over! Your score was ${score}/${maxCards} Do you want to play again?`)) restartCallback();
  }

  return (<ReactGame numCards={maxCards} gameOverHandler={onGameOver}/>);
}
export default App;
