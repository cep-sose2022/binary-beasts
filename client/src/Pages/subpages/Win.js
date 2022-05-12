import React, {useEffect} from "react";
import service from '../../service';
import { useNavigate } from "react-router-dom";
import lib from '../../library/bib.js';

function Win() {
    let navigate = useNavigate();

    const levelNumber = localStorage.getItem('levelNumber');
    const levels = service.getAllLevels();
    const level = levels.allLevels.filter(level => level.token === "level" + levelNumber);

    return(
        <div id="win-info">
            <div id="win-score">
            <h1>{level[0].name}</h1>
            <p>Sie haben das Level {level[0].name} abgeschlossen und {lib.getScore()} extra Punkte erhalten.</p>
            </div>
            <div id="win-description">
                <p>{localStorage.getItem('feedback')}</p>
            </div>
            <button onClick={() => {
                localStorage.removeItem('levelNumber');
                localStorage.removeItem('feedback');
                localStorage.removeItem('level');
                navigate("/leveloverview");
            }}>Level Overview</button>
        </div>
    );
}

export default Win;