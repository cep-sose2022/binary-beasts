/**
 * get all data from backend for one level
 * @param levelName
 * @returns {any}
 */
const getLevel = (levelName) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getLevel/${levelName}`, false );
    xmlHttp.send( null );
    var jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * get all levels from backend
 * @returns {any}
 */
const getAllLevels = () => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getAllLevels`, false );
    xmlHttp.send( null );
    var jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * returns all events for one level
 * @param levelId
 * @returns {any}
 */
const getEvent = (levelId) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getEvent/${levelId}`, false );
    xmlHttp.send( null );
    var jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * returns all cards for one event
 * @param eventId
 * @returns {any}
 */
const getEventCard = (eventId) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game//getEventCard/${eventId}`, false );
    xmlHttp.send( null );
    var jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * returns a card by cardId
 * @param cardId
 * @returns {any}
 */
const getCard = (cardId) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getCard/${cardId}`, false );
    xmlHttp.send( null );
    var jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * get leaderboard from backend
 * @returns {any}
 */
 const getLeaderboard = () => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/leaderboard/getLeaderboard`, false );
    xmlHttp.send( null );
    var jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
 }

/**
 * get leaderboard for a user from backend
 * @param username
 * @returns {any}
 */
 const getUserLeaderboard = (username) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/leaderboard/getUserLeaderboard/${username}`, false );
    xmlHttp.send( null );
    var jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
 }

/**
 * get leaderboard for a user from backend
 * @param body
 * @returns {any}
 */
 const postUserLeaderboard = (body) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", `http://localhost:5000/leaderboard/postLeaderboard/`, false );
    xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xmlHttp.send(body);
    var jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
 }


module.exports = {
    getLevel, getAllLevels, getEvent, getEventCard, getCard, getLeaderboard, getUserLeaderboard, postUserLeaderboard
}
