import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Lvl1_Network from "./Levels/Lvl1_Network";
import Lvl2_Malware from "./Levels/Lvl2_Malware"
import Lvl3_Devices from "./Levels/Lvl3_Devices";
import Lvl4_RAccess from "./Levels/Lvl4_RAccess";
import Lvl5_Patchmanagement from "./Levels/Lvl5_Patchmanagement";
//import Level6 from "./Levels/Lvl6_";
import Lvl7_Incident from "./Levels/Lvl7_Incident";
import Lvl8_UserControl from "./Levels/Lvl8_UserControl";
import Lvl10_Phishing from "./Levels/Lvl10_Phishing";
import service from '../service';

function Game(){
    const location = useLocation();
    let navigate = useNavigate();

    const [levelName, setLevelName] = useState("");
    const [previousScore, setPreviousScore] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    
    let level;
    React.useEffect(() => {
        level = service.getLevel("level" + location.state.levelid);
    }, []);

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

        {location.state.levelid === 1 && <Lvl1_Network passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        {location.state.levelid === 2 && <Lvl2_Malware passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        {location.state.levelid === 3 && <Lvl3_Devices passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        {location.state.levelid === 4 && <Lvl4_RAccess passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        {location.state.levelid === 5 && <Lvl5_Patchmanagement passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        {/* {location.state.levelid === 6 && <Level6 passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>} */}
        {location.state.levelid === 7 && <Lvl7_Incident passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        {location.state.levelid === 8 && <Lvl8_UserControl passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        {location.state.levelid === 10 && <Lvl10_Phishing passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName}/>}
        </>
    );
}



export default Game;
