const service = {};

/**
 * get all data from backend for one level
 * @param levelName
 * @returns {any}
 */
service.getLevel = (levelName) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getLevel/${levelName}`, false );
    xmlHttp.send( null );
    const jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * get all levels from backend
 * @returns {any}
 */
service.getAllLevels = () => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getAllLevels`, false );
    xmlHttp.send( null );
    const jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * returns all events for one level
 * @param levelId
 * @returns {any}
 */
service.getEvent = (levelId) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getEvent/${levelId}`, false );
    xmlHttp.send( null );
    const jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * returns all cards for one event
 * @param eventId
 * @returns {any}
 */
service.getEventCard = (eventId) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game//getEventCard/${eventId}`, false );
    xmlHttp.send( null );
    const jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * returns a card by cardId
 * @param cardId
 * @returns {any}
 */
service.getCard = (cardId) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getCard/${cardId}`, false );
    xmlHttp.send( null );
    const jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * get leaderboard from backend
 * @returns {any}
 */
service.getLeaderboard = () => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/leaderboard/getLeaderboard`, false );
    xmlHttp.send( null );
    const jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * get leaderboard for a user from backend
 * @param username
 * @returns {any}
 */
service.getUserLeaderboard = (username) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/leaderboard/getUserLeaderboard/${username}`, false );
    xmlHttp.send( null );
    const jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}

/**
 * get leaderboard for a user from backend
 * @param body
 * @returns {any}
 */
service.postUserLeaderboard = (body) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", `http://localhost:5000/leaderboard/postLeaderboard/`, false );
    xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xmlHttp.send(body);
    const jsonResponse = JSON.parse(xmlHttp.responseText);
    return jsonResponse;
}


module.exports = service;
