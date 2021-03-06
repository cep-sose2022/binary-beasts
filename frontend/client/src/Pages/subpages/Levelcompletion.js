import React, { useState } from "react";
import service from '../../service';
import { useNavigate, useLocation } from "react-router-dom";
import lib from '../../library/bib.js';
import Navbar from "../../Navbar";
import {motion} from "framer-motion";

function Win() {
    const location = useLocation();
    let navigate = useNavigate();
    var levelNumber;
    var levels;
    var level;
    const [feedbackVisible, setFeedbackVisible] = useState(false);

    if (localStorage.getItem('levelNumber')) {
        levelNumber = localStorage.getItem('levelNumber');
        levels = service.getAllLevels();
        level = levels.allLevels.filter(level => level.token === "level" + levelNumber);
    }
    return (
        <>
            <Navbar />
            <div id="win-container" className="container">
                <motion.div id="win-description" className="box"
                            initial={{ opacity: 0, translateX: 100, translateY: -100 }}
                            animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                            transition={{ duration: 1.1 }}>
                    <div id="win-score">
                        <p>{!localStorage.getItem('levelNumber') ? 'Sie haben das Level noch nicht abgeschlossen' : `Sie haben das Level ${level[0].name} abgeschlossen und ${lib.getScore() >= 0? lib.getScore() : 0} Punkte erhalten.`}</p>
                    </div><br />
                    <p>{!localStorage.getItem('feedback') ? ' ' : localStorage.getItem('feedback')}</p>

                    <button id="levelOverview-button" onClick={() => {
                        localStorage.removeItem('levelNumber');
                        localStorage.removeItem('feedback');
                        localStorage.removeItem('level');
                        lib.setLevelStartScore('zero');
                        navigate("/leveloverview");
                    }}>Zu Levels</button>
                    <button onClick={() => setFeedbackVisible(!feedbackVisible)}>Gespielte Karten</button>
                </motion.div>
                
                <div id="levelcompletiontablegrid">
                {feedbackVisible && <div id="levelcompletiontable">
                            
                        <table id="tablehead">
                        <th>Gespielte Karte</th>
                        <th>Feedback</th>
                        </table>
                        
                        <div id="tds"><table>
                        {
                            location.state.cardsPlayed.map(card => {
                                if (card[2]) {
                                    return (
                                        <tr style={{ backgroundColor: "#2ec300c2"}}>
                                            <td>{card[0]}</td>
                                            <td>{card[1]}</td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr style={{ backgroundColor: "#ff0000ca" }}>
                                            <td>{card[0]}</td>
                                            <td>{card[1]}</td>
                                        </tr>
                                    )
                                }

                            })
                        }</table></div>
                    
                </div>}
                </div>
            </div>
        </>
    );
}

export default Win;