/**
 * get all data from backend for one level
 * @param levelName
 * @returns {string}
 */
const getLevel = (levelName) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getLevel/${levelName}`, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/**
 * get all levels from backend
 * @returns {string}
 */
const getAllLevels = () => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getAllLevels`, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/**
 * returns all events for one level
 * @param levelId
 * @returns {string}
 */
const getEvent = (levelId) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getEvent/${levelId}`, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/**
 * returns all cards for one event
 * @param eventId
 * @returns {string}
 */
const getEventCard = (eventId) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game//getEventCard/${eventId}`, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/**
 * returns a card by cardId
 * @param cardId
 * @returns {string}
 */
const getCard = (cardId) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `http://localhost:5000/game/getCard/${cardId}`, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


module.exports = {
    getLevel, getAllLevels, getEvent, getEventCard, getCard
}
