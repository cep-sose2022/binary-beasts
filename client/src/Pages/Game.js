import React from "react";
import { useLocation } from "react-router-dom";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2"
import Level3 from "./Levels/Level3";
import logo from "../images/logobb.png";

function Game() {
    const location = useLocation();
    return(
        <>
        <nav className="gameNavbar">
            {/* <div class="background"><img src={background} alt="not found"></img></div> */}
            <div id="navlevelround"className="navgamecontent">
                <p>Level: <span>1</span> </p>
                <p>Round: <span>1</span> </p>
            </div>
            <div className="navgamecontent">
                <p>Time: <span>00:00</span> </p>
            </div>
            <div id="score" className="navgamecontent">
                <p>Score: <span>40</span></p>
            </div>
            
        </nav>
        <div className="game">
            {/* <h2>Level {location.state.levelid}</h2> */}
            {location.state.levelid === 1 && <Level1 />}
            {location.state.levelid === 2 && <Level2 />}
            {location.state.levelid === 3 && <Level3 />}
        </div>
        </>
    );
}



export default Game;