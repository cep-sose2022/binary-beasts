import React from "react";
import service from '../../service';
import { useNavigate } from "react-router-dom";
import lib from '../../library/bib.js';

function Win() {
    let navigate = useNavigate();
    var levelNumber;
    var levels;
    var level;

    if (localStorage.getItem('levelNumber')) {
        levelNumber = localStorage.getItem('levelNumber');
        levels = service.getAllLevels();
        level = levels.allLevels.filter(level => level.token === "level" + levelNumber);
    }
    return(
        <div id="win-container" className="container">
            <div id="win-title">
                <h1>{!localStorage.getItem('levelNumber') ? ' ' : level[0].name}</h1>
            </div>
            <div id="win-description" className="box">
                <div id="win-score">
                    <p>{!localStorage.getItem('levelNumber') ? 'Sie haben das Level noch nicht abgeschlossen' : `Sie haben das Level ${level[0].name} abgeschlossen und ${lib.getScore()} extra Punkte erhalten.`}</p>
                </div><br/>
                <p>{!localStorage.getItem('feedback') ? ' '  : localStorage.getItem('feedback')}</p>
            </div><div id="win-button">
            <button id="levelOverview-button" onClick={() => {
                localStorage.removeItem('levelNumber');
                localStorage.removeItem('feedback');
                localStorage.removeItem('level');
                navigate("/leveloverview");
            }}>Level Overview</button>
        </div>
        </div>
    );
}

export default Win;