/* eslint-disable no-empty */
import Game from "./game/Game";

export default function run(){

    let a = new Game(10);
    window.play = ()=>{a.loop()};
}