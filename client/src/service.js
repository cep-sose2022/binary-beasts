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


module.exports = {
    getLevel,
}
