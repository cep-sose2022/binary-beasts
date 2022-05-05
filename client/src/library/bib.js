const service = require('./../service');
const lib = {};

/**
 * set username in localStorage
 * @param name
 */
lib.setNickname = (name) => {
    localStorage.setItem('username', name);
};

/**
 * get username from localStorage
 * @returns {string}
 */
lib.getNickname = () => {
    return localStorage.getItem('username');
};

/**
 * set score for user
 * should be used every time a level is started
 * @param levelToken
 */
lib.setLevelStartScore = (levelToken) => {
    const scores = service.getScores();
    let userScore = 0;

    // check if user has a score in database using service
    for (let i = 0; i < scores.sortedUsers.length; i++) {
        if (scores.sortedUsers[i].username === lib.getNickname()) {
            userScore = scores.sortedUsers[i].score;
        }
    }

    // check if user has a score for THIS level in database using service
    const level = service.getLevel(levelToken);
    const leaderBoard = service.getUserLeaderboard(lib.getNickname());
    for (let i = 0; i < leaderBoard.userLeaderboard.length; i++) {
        if(leaderBoard.userLeaderboard[i].levelId === level.level._id) {
            userScore -= leaderBoard.userLeaderboard[i].score;
        }
    }
    localStorage.setItem('score', userScore);
};

/**
 * update score in level
 * @param points
 */
lib.updateScore = (points) => {
    let temp = parseInt(localStorage.getItem('score'));
    temp += points;
    localStorage.setItem('score', temp);
};

/**
 * get current score
 * @returns {number}
 */
lib.getScore = () => {
    return parseInt(localStorage.getItem('score'));
};

module.exports = lib;