import React from "react";
import service from "./../service";

const leaderboard = service.getLeaderboard();


function Leaderboard() {

    // test for service
    console.log('Leaderboard: ', leaderboard);
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
            <div id="board-container" name="board-container">
                <table id="board" name="board">
                    <th>
                        <td>User</td>
                        <td>Score</td>
                    </th>
                {
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
                }
                </table>
            </div>
        </div>
    );
}

/*
function sumScore(){
    for (let i = 0; i < leaderboard.length; i++) {
        
        
    }
}
*/

/*
function sortUser(array,half = array.length/2){ //mergesort
    if(array.length < 2){
        return array
      }
    
      const left = array.splice(0,half); //left part of array
    
      return merger(sortUser(left),sortUser(array))
}


function merger(left,right){
    const arr = [];

    while(left.length && right.length){
      if(left[0] < right [0]){
        arr.push(left.shift())
      }else{
        arr.push(right.shift())
      }
    }
  
    return [...arr,...left,...right];
  
}
*/

export default Leaderboard;