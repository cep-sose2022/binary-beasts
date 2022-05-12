import React from "react";
import { useLocation } from "react-router-dom";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2"
import Level3 from "./Levels/Level3";
import logo from "../images/kanye-west-stare.gif";
<<<<<<< HEAD

function Game() {
    const location = useLocation();
    return(
        <>
        {location.state.levelid === 1 && <Level1 />}
        {location.state.levelid === 2 && <Level2 />}
        {location.state.levelid === 3 && <Level3 />}
=======
import service from "../service";
import lib from "../library/bib";

function Game(props) {

    // Timer
    const { startingMinutes = 4, startingSeconds = 0 } = 4;
    const [mins, setMinutes] = useState(startingMinutes);
    const [secs, setSeconds] = useState(startingSeconds);
    useEffect(() => {
        let sampleInterval = setInterval(() => {
            if (secs > 0) {
                setSeconds(secs - 1);
            }
            if (secs === 0) {
                if (mins === 0) {
                    const dif = lib.getScore() - startScore;
                    service.postUserLeaderboard(lib.getNickname(), level.level._id, dif);
                    navigate('./../LevelOverview');
                } else {
                    setMinutes(mins - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            clearInterval(sampleInterval);
        };
    });
    // end of Timer  

    const location = useLocation();
    let navigate = useNavigate(); 
    
    let level = service.getLevel("level1"); //default Level if none is selected
    const startScore = lib.getScore();
    
    const [currentEvent, setCurrentEvent] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);
    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    /*

    function setLevel(lvlNumber){
        level = service.getLevel("level" + lvlNumber);
        lib.setLevelStartScore("level" + lvlNumber);
    }

    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
        setCurrentCards(level.level.events[currentEvent - 1].cards);
    }, [currentEvent]);

    const handleCardClick = (cardOption) => {
        setCurrentEvent(cardOption.nextEvent);
        setEventTextNumber(cardOption.nextEventText);
        setCurrentRound(currentRound + 1);
        setCurrentCards(currentCards.filter(card => card.name != cardOption.name));
        lib.updateScore(cardOption.points);

       if (cardOption.nextEvent === 0) {
            endGame();
        }
    }

    function endGame() {
        const dif = lib.getScore() - startScore;
        service.postUserLeaderboard(lib.getNickname(), level.level._id, dif);
        navigate('./../LevelOverview');
    }

*/

    return (
        <div className='app'>
        <>
            <nav className="gameNavbar">
                {/* <div class="background"><img src={background} alt="not found"></img></div> */}
                <div id="navlevelround" className="navgamecontent">
                    <p>Level: <span>{location.state.levelid}</span> </p>
                    <p>Round: <span>{currentRound}</span> </p>
                </div>
                <div className="navgamecontent">
                    <p>Time: <span>{mins}:{secs < 10 ? `0${secs}` : secs}</span> </p>
                </div>
                <div id="score" className="navgamecontent">
                    <p>Score: <span>{lib.getScore()}</span></p>
                </div>
            </nav>
     

            {location.state.levelid === 1 && <Level1 />}
            {location.state.levelid === 2 && <Level2 />}
            {location.state.levelid === 3 && <Level3 />}
>>>>>>> parent of 7b75199 (BB-60: Remove unnecessary code)
        </>
    );
}



export default Game;