import React from "react";
import service from "../service";

const allLevels = service.getAllLevels().allLevels;
const userBoard = service.getUserLeaderboard("Shamel").userLeaderboard; // TODO adjust username

function Progress() {
    return(
        <div id="progress-container">
            <div id="headline" name="headline">
                <h1>Fortschritt - Shamel{/* TODO needs to be adapted */}</h1>
            </div>
            <div id="overview" name="overview">
                <h2>Gesamt</h2>
                {calcProgress()}
            </div>
            <div id="level-scores" name="level-scores">
                <h2>Level-Überblick</h2>
                {displayLevelScores()}
            </div>
        </div>
    );
}


//determine the percentage of the finished levels
function calcProgress(){
    return (
        <p>{Math.round(userBoard.length/allLevels.length * 100)} %</p>
    )
}

// returns table with the levelname and the corresponding score
function displayLevelScores(){
    return(
        <table>
            <tr>
                <th>Level</th>
                <th>Punkte</th>
            </tr>
            {
            userBoard.forEach(element => {
                return(<tr>
               <td>{allLevels.getLevelName(element.id)}</td>
               <td>{element.score}</td>
               </tr>)
            })
            }
        </table>
    )
}


export default Progress;