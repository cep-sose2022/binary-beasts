import React from "react";
import service from "./../service";



function Leaderboard(props) {
    
    // test for service
    const leaderboard = service.getLeaderboard();
    console.log('.....Leaderboard: ', leaderboard);
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

    let rank = 0;

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
                    sortUserScore(leaderboard.leaderboard).map(key => {
                        rank++; //rank starts with 0 -> increase before adding new user
                        return  (
                            <tr key={key}>
                                <td>{rank}</td>
                                <td>
                                    {key.username} 
                                </td>
                                <td>
                                    {key.score}
                                </td>
                            </tr>
                            )    
                    })
                    /*
                    Object.keys(leaderboard.leaderboard).map((key) => {
                        return  (
                        <tr>
                            <td>
                                {leaderboard.leaderboard[key].username} 
                            </td>
                            <td>
                                {leaderboard.leaderboard[key].score}
                            </td>
                        </tr>
                        )    
                    })
                    */
                }
                </tbody>
                </table>
            </div>
        </div>
    );
}

//show users by name
function sortUserName(){

}


// inspired by: https://reactgo.com/merge-sort-algorithm-javascript/
//mergesort for ranking users after score
function sortUserScore(array, half = array.length/2){ //input: leaderboard.leaderboard -> whole objects are sorted
    if(array.length < 2){
        return array
      }
    
      const left = array.splice(0,half); //left part of array
    
      return merger(sortUserScore(left),sortUserScore(array))
}


function merger(left,right){
    const arr = [];

    while(left.length && right.length){
      if(left[0].score > right[0].score){
        arr.push(left.shift())
      }else{
        arr.push(right.shift())
      }
    }
  
    return [...arr,...left,...right];
  
}


export default Leaderboard;