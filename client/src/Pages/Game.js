import React from "react";
import {useState} from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import Lvl1_Network from "./Levels/Lvl1_Network";
import Lvl2_Malware from "./Levels/Lvl2_Malware"
import Lvl3_Devices from "./Levels/Lvl3_Devices";
import Lvl4_RAccess from "./Levels/Lvl4_RAccess";
import Lvl5_Patchmanagement from "./Levels/Lvl5_Patchmanagement";
import Lvl6_Monitoring from "./Levels/Lvl6_Monitoring";
import Lvl7_Incident from "./Levels/Lvl7_Incident";
import Lvl8_UserControl from "./Levels/Lvl8_UserControl";
import Lvl9_Phones from "./Levels/Lvl9_Phones";
import Lvl10_Phishing from "./Levels/Lvl10_Phishing";
import service from '../service';
import {motion} from "framer-motion";
import trueAnswer from './../images/accept.png';
import falseAnswer from './../images/cancel.png';
import neutralAnswer from './../images/sun.png';


function Game(){
    const location = useLocation();
    let navigate = useNavigate();

    const [levelName, setLevelName] = useState("");
    const [maxScore, setMaxScore] = useState(0);
    const [previousScore, setPreviousScore] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);

    let level;
    React.useEffect(() => {
        if (!location.state) {
            navigate('../')
        } else {
            level = service.getLevel("level" + location.state.levelid);
        }
    }, []);

    if(!location.state) return <Navigate replace to="/" />

    return(
        <>
        <nav id="gameNavbar">
            <div id="navlevelround"className="navgamecontent">
                <p>Level: <span className="gameNavbar-blue">{levelName}</span></p>
            </div>
            {currentScore > previousScore && <motion.img alt="trueAnswer" src={trueAnswer} className='score-image'
                                                         animate={{
                                                             x: [0, -200, 200, 0, 0],
                                                             y: [0, 0, 0, 0, 0],
                                                             rotate: -360,
                                                         }}
                                                         transition={{ duration: 3, ease: "anticipate" }}/>}
            {currentScore < previousScore && <motion.img alt="falseAnswer" src={falseAnswer} className='score-image'
                                                         animate={{
                                                             x: [0, -200, 200, 0, 0],
                                                             y: [0, 0, 0, 0, 0],
                                                             rotate: -360,
                                                         }}
                                                         transition={{ duration: 3, ease: "anticipate" }}/>}
            {currentScore === previousScore && <motion.img alt="neutralAnswer" src={neutralAnswer} className='score-image'
                                                           animate={{
                                                               x: [0, -200, 200, 0, 0],
                                                               y: [0, 0, 0, 0, 0],
                                                               rotate: -360,
                                                           }}
                                                           transition={{ duration: 3, ease: "anticipate" }}/>}
            <div id="score" className="navgamecontent">
                <div id="scorecontent" className="score">
                    <p>Score:
                    {currentScore === previousScore && <span className="gameNavbar-blue"> {currentScore + " "}</span>}
                    {currentScore > previousScore && <motion.span className="score-green"
                                                                  animate={{
                                                                      backgroundColor: ["rgba(10,122,67,0.58)", "#0fda06", "#a3ff33", "#2EF57DFF"],
                                                                  }}
                                                                  transition={{ duration: 2, ease: "linear" }}> {currentScore + " "}</motion.span>}
                    {currentScore < previousScore && <motion.span className="score-red"
                                                                  animate={{
                                                                      backgroundColor: ["#ff33dd", "#ff0090", "#ff3333", "#E85151FF"],
                                                                  }}
                                                                  transition={{ duration: 2, ease: "linear" }}> {currentScore + " "}</motion.span>}
                    / <span className="gameNavbar-blue">{maxScore}</span>
                </p>
                </div>
            </div>
        </nav>

        {location.state.levelid === 1 && <Lvl1_Network passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName} passMaxScore={setMaxScore}/>}
        {location.state.levelid === 2 && <Lvl2_Malware passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName} passMaxScore={setMaxScore}/>}
        {location.state.levelid === 3 && <Lvl3_Devices passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName} passMaxScore={setMaxScore}/>}
        {location.state.levelid === 4 && <Lvl4_RAccess passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName} passMaxScore={setMaxScore}/>}
        {location.state.levelid === 5 && <Lvl5_Patchmanagement passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName} passMaxScore={setMaxScore}/>}
        {location.state.levelid === 6 && <Lvl6_Monitoring passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName} passMaxScore={setMaxScore}/>}
        {location.state.levelid === 7 && <Lvl7_Incident passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName} passMaxScore={setMaxScore}/>}
        {location.state.levelid === 8 && <Lvl8_UserControl passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName} passMaxScore={setMaxScore}/>}
        {location.state.levelid === 9 && <Lvl9_Phones passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName} passMaxScore={setMaxScore}/>}
        {location.state.levelid === 10 && <Lvl10_Phishing passCurrentScore={setCurrentScore} passPreviousScore={setPreviousScore} passLevelName={setLevelName} passMaxScore={setMaxScore}/>}
        </>
    );
}

export default Game;
