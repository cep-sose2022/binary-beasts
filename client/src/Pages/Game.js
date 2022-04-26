import React from "react";
import { useLocation } from "react-router-dom";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2"

function Game() {
    const location = useLocation();
    return(
        <div>
            <h1>Spiel</h1>
            {/* <h2>Level {location.state.levelid}</h2> */}
            {location.state.levelid === 1 && <Level1 />}
            {location.state.levelid === 2 && <Level2 />}

        </div>
    );
}

export default Game;