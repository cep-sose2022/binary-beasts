import React from "react";
import { useLocation } from "react-router-dom";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2"
import Level3 from "./Levels/Level3";
import logo from "../images/kanye-west-stare.gif";

function Game() {
    const location = useLocation();
    return(
        <>
        {location.state.levelid === 1 && <Level1 />}
        {location.state.levelid === 2 && <Level2 />}
        {location.state.levelid === 3 && <Level3 />}
        </>
    );
}



export default Game;