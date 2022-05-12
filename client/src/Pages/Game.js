import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2"
import Level3 from "./Levels/Level3";
import service from '../service';
import lib from '../library/bib.js';

function Game(){
    const location = useLocation();
    const startScore = lib.getScore();
    let navigate = useNavigate();    

     // Timer
     const startingMinutes = 4;
     const startingSeconds = 0;
     const [mins, setMinutes] = useState(startingMinutes);
     const [secs, setSeconds] = useState(startingSeconds);

     let level;
    switch(location.state.levelid){
        case 1:
            level = service.getLevel("level1");
            break;
        case 2:
            level = service.getLevel("level2");
            break;    
        case 3:
            level = service.getLevel("level3");
            break;    
    }
    
     useEffect(() => {
         let sampleInterval = setInterval(() => {
             if (secs > 0) {
                 setSeconds(secs - 1);
             }
             if (secs === 0) {
                 if (mins === 0) {
                     const dif = lib.getScore() - startScore;
                     service.postUserLeaderboard(lib.getNickname(), level.level._id, dif);
                     navigate('./../LevelOverview');
                 } else {
                     setMinutes(mins - 1);
                     setSeconds(59);
                 }
             }
         }, 1000);
         return () => {
             clearInterval(sampleInterval);
         };
     });
     //end of Timer

    return(
        <>
        <nav id="gameNavbar">
            <div id="navlevelround"className="navgamecontent">
                <p>Level: <span>1</span></p>
            </div>
            <div id="navtimer" className="navgamecontent">
                <p>Time: <span>{mins}:{secs < 10 ? `0${secs}` : secs}</span> </p>
            </div>
            <div id="score" className="navgamecontent">
                <p>Score: <span>{lib.getScore()}</span></p>
            </div>   
        </nav>

        {location.state.levelid === 1 && <Level1 />}
        {location.state.levelid === 2 && <Level2 />}
        {location.state.levelid === 3 && <Level3 />}
        </>
    );
}



export default Game;