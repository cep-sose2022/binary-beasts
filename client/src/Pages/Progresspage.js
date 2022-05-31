import React from "react";
import service from "../service";
import lib from "../library/bib.js";
import Navbar from "../Navbar";

function Progress(props) {
    const allLevels = service.getAllLevels().allLevels;
    const userBoard = service.getUserLeaderboard(lib.getNickname()).userLeaderboard;

    //determine the percentage of the finished levels
    function calcProgress(){
        return (
            <p>{Math.round(userBoard.length/allLevels.length * 100)} %</p>
        )
    }
    return(
        <>
        <Navbar />
        <div id="progress-container" className="container">
            <div id="info" className="box">
                <h1>Fortschritt - {lib.getNickname()}</h1>
            <div id="overview">
                <h2>Gesamtfortschritt aller Levels: {calcProgress()}</h2>
            </div>
            <div id="level-scores">
                <h2>Level-Überblick:</h2>
                <table id="board">
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
                                    <td>{element.score + " / " + allLevels.filter(level => level._id === element.levelId)[0].maxScore}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </>
    );
}


export default Progress;