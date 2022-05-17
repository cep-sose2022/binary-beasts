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
    localStorage.setItem('score', 0);
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

/**
 * Delay for a number of milliseconds
 */
lib.wait = (delay) => {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
};

module.exports = lib;