import React from "react";
import { useLocation } from "react-router-dom";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2"
import logo from "../images/logobb.png";

function Game() {
    const location = useLocation();
    return(
        <>
        <nav>
            <div className="logo"><img src={logo} alt="not found"></img></div>
            {/* <div class="background"><img src={background} alt="not found"></img></div> */}
                <div class ="navlinks">
                <p>Punkte</p>
            </div>
        </nav>
        <div className="game">
            <h1>Spiel</h1>
            {/* <h2>Level {location.state.levelid}</h2> */}
            {location.state.levelid === 1 && <Level1 />}
            {location.state.levelid === 2 && <Level2 />}

        </div>
        </>
    );
}



export default Game;