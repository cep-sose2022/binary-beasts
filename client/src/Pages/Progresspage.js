import React from "react";
import service from "../service";
import lib from "../library/bib.js";
import Navbar from "../Navbar";

const allLevels = service.getAllLevels().allLevels;
const userBoard = service.getUserLeaderboard(lib.getNickname()).userLeaderboard; 

function Progress() {
    return(
        <>
        <Navbar />
        <div id="progress-container" className="container">
            {console.log(lib.getNickname())}
            <div id="info" className="box">
                <h1>Fortschritt - {lib.getNickname()}</h1>
            
            <div id="overview">
                <h2>Gesamt</h2>
                {calcProgress()}
            </div>
            <div id="level-scores">
                <h2>Level-Überblick</h2>
                {displayLevelScores()}
            </div>
            </div>
        </div>
        </>
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
            <thead>
            <tr>
                <th>Level</th>
                <th>Punkte</th>
            </tr>
            </thead>
            <tbody>
            {
            userBoard.map(element => {
                return(
                    <tr key={element}>
                    <td>{service.getLevelName(element.levelId).levelName}</td>
                    <td>{element.score}</td>
                    </tr>
               )
            })
            }
            </tbody>
        </table>
    )
}


export default Progress;