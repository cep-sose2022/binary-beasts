const backendUrl = 'http://localhost:5000';
const service = {};
let jsonResponse;

/**
 * get all data from backend for one level
 * @param levelName
 * @returns {any}
 */
service.getLevel = (levelName) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `${backendUrl}/game/getLevel/${levelName}`, false );
    xmlHttp.send( null );
    jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * get all levels from backend
 * @returns {any}
 */
service.getAllLevels = () => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `${backendUrl}/game/getAllLevels`, false );
    xmlHttp.send( null );
    jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * returns all events for one level
 * @param levelId
 * @returns {any}
 */
service.getEvents = (levelId) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `${backendUrl}/game/getEvents/${levelId}`, false );
    xmlHttp.send( null );
    jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * returns all cards for one event
 * @param eventId
 * @returns {any}
 */
service.getEventCards = (eventId) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `${backendUrl}/game//getEventCards/${eventId}`, false );
    xmlHttp.send( null );
    jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * returns a card by cardId
 * @param cardId
 * @returns {any}
 */
service.getCard = (cardId) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `${backendUrl}/game/getCard/${cardId}`, false );
    xmlHttp.send( null );
    jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * get leaderboard from backend
 * @returns {any}
 */
service.getLeaderboard = () => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `${backendUrl}/leaderboard/getLeaderboard`, false );
    xmlHttp.send( null );
    jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * get leaderboard for a user from backend
 * @param username
 * @returns {any}
 */
service.getUserLeaderboard = (username) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `${backendUrl}/leaderboard/getUserLeaderboard/${username}`, false );
    xmlHttp.send( null );
    jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * sends leaderboard data to server
 * @param username
 * @param levelId
 * @param score
 * @returns {any}
 */
service.postUserLeaderboard = (username, levelId, score) => {
    const xmlHttp = new XMLHttpRequest();
    const body = ({
        username: username,
        levelId: levelId,
        score: score
    });
    xmlHttp.open( "POST", `${backendUrl}/leaderboard/postLeaderboard/`, false );
    xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xmlHttp.send(JSON.stringify(body));
    jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * get a sorted list for users scores from backend
 * @returns {any}
 */
service.getScores = () => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `${backendUrl}/leaderboard/getScores`, false );
    xmlHttp.send( null );
    jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}


module.exports = service;
