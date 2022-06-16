import React from "react";
import service from "../service";
import lib from "../library/bib.js";
import Navbar from "../Navbar";
import ProgressBar from "@ramonak/react-progress-bar";

function Progress(props) {
    const allLevels = service.getAllLevels().allLevels;
    const userBoard = service.getUserLeaderboard(lib.getNickname()).userLeaderboard;

    //determine the percentage of the finished levels
    function calcProgress(){
        return (
            Math.round(userBoard.length/allLevels.length * 100)
        )
    }

    return(
        <>
        <Navbar />
        <div id="progress-container" className="container">
            <div id="info" className="box">
                <h1>Fortschritt - {lib.getNickname()}</h1>
            <div id="overview">
                <h2>Abgeschlossene Levels: </h2>
                <ProgressBar id="progressbar" variant="success"
                             className="barWrapper"
                             barContainerClassName="barContainer"
                             labelClassName="barLabel"
                             completed={calcProgress()}
                             maxCompleted={100}/>
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
                                <tr key={element._id}>
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