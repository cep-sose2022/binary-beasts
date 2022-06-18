import React from "react";
import service from "../service";
import Navbar from "../Navbar";

function Leaderboard(props) {

    const boardScores = service.getScores();

    return(
        <>
        <div></div>
        <Navbar id="leaderboard_nav"/>
        <div id="board-container" name="board-container">
            {/* <h1>Leaderboard-Ranking</h1> */}
            <div>
                <table id="board" name="board">
                    <thead>
                    <tr>
                        <th>Platz</th>
                        <th>User</th>
                        <th>Punkte</th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    boardScores.sortedUsers.map(key => {
                        return  (
                            <tr key={key.username}>
                                <td>{key.rank}</td>
                                <td>
                                    {key.username} 
                                </td>
                                <td>
                                    {key.score}
                                </td>
                            </tr>
                            )    
                    })
                }
                </tbody>
                </table>
            </div>
        </div>
        </>
    );
}

export default Leaderboard;