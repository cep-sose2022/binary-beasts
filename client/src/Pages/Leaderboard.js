import React from "react";
import service from "./../service";



function Leaderboard(props) {
    
    // test for service
    const leaderboard = service.getLeaderboard();
    console.log('.....Leaderboard: ', leaderboard);
    const userLeaderboard = service.getUserLeaderboard("test1");
    console.log('User-Leaderboard: ', userLeaderboard);
    const boardScores = service.getScores();

    const body = JSON.stringify({
        username: "httpInsertTest",
        levelId: "test",
        score: 5
    });

    //Comment out for sending post-request for above body
    //const postUserLeaderboard = service.postUserLeaderboard(body);
    //console.log('Post-User-Leaderboard: ', postUserLeaderboard);


    return(
        <div id="board-container" name="board-container">
            <h1>Leaderboard-Ranking</h1>
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
                            <tr key={key}>
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
    );
}

export default Leaderboard;