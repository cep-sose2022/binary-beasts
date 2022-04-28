import React from "react";
import service from "./../service";

function Leaderboard() {

    // test for service
    const leaderboard = service.getLeaderboard();
    console.log('leaderboard: ', leaderboard);
    const userLeaderboard = service.getUserLeaderboard("test1");
    console.log('User-Leaderboard: ', userLeaderboard);

    const body = JSON.stringify({
        username: "httpInsertTest",
        levelId: "test",
        score: 5
    });

    //Comment out for sending post-request for above body
    //const postUserLeaderboard = service.postUserLeaderboard(body);
    //console.log('Post-User-Leaderboard: ', postUserLeaderboard);
    

    return(
        <div>
            <h1>Leaderboard-Ranking</h1>
            
        </div>
    );
}

export default Leaderboard;