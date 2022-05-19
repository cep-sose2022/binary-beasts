import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2"
import Level3 from "./Levels/Level3";
import Level5 from "./Levels/Level5";
import Level6 from "./Levels/Level6";
import service from '../service';

function Game(){
    const location = useLocation();
    let navigate = useNavigate();

<<<<<<< HEAD
    const [levelName, setLevelName] = useState("");
    const [previousScore, setPreviousScore] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    
    let level;
    switch(location.state.levelid){
=======
     // Timer
     const startingMinutes = 4;
     const startingSeconds = 0;
     const [mins, setMinutes] = useState(startingMinutes);
     const [secs, setSeconds] = useState(startingSeconds);

     let level;
     level = service.getLevel("level"+location.state.levelid);
   /* switch(location.state.levelid){
>>>>>>> cce2d34 (BB-119: Insert basic code into level 4)
        case 1:
            level = service.getLevel("level1");
            break;
        case 2:
            level = service.getLevel("level2");
            break;    
        case 3:
            level = service.getLevel("level3");
<<<<<<< HEAD
            break;
        case 5:
            level = service.getLevel("level5");
        case 6:
            level = service.getLevel("level6");
        break;    
    }
=======
            break;    
    }*/
    
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
>>>>>>> cce2d34 (BB-119: Insert basic code into level 4)

    return(
        <>
        <nav id="gameNavbar">
            <div id="navlevelround"className="navgamecontent">
                <p>Level: <span className="gameNavbar-blue">{levelName}</span></p>
            </div>
            <div id="navtimer" className="navgamecontent">
                {/* <p>Time: {<span className="gameNavbar-blue">{mins}:{secs < 10 ? `0${secs}` : secs}</span>} </p> */}
            </div>
            <div id="score" className="navgamecontent">
                <p>Score:  
                    {currentScore === previousScore && <span className="gameNavbar-blue"> {currentScore}</span>}
                    {currentScore > previousScore && <span className="score-green"> {currentScore}</span>}
                    {currentScore < previousScore && <span className="score-red"> {currentScore}</span>}
                </p>
            </div>   
        </nav>

        {location.state.levelid === 1 && <Level1 passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        {location.state.levelid === 2 && <Level2 passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        {location.state.levelid === 3 && <Level3 passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        {location.state.levelid === 5 && <Level5 passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        {location.state.levelid === 6 && <Level6 passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        </>
    );
}



export default Game;
