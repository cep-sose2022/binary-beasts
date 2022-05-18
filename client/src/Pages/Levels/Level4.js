import React, {useState, useEffect, useRef} from "react";
import service from "../../service";
import { useNavigate } from "react-router-dom";
import lib from "../../library/bib";


const level = service.getLevel('level4');

function Level4() {
    let navigate = useNavigate();
    const [currentEvent, setCurrentEvent] = useState(0);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    let startScore = lib.getScore(); 

    const history = useState(currentEvent);
    

    let encryptDrive = false;
    let scanForVirus = false;
    let whitelisting = false;
    let physicalLocks = false;


    React.useEffect(() => {
        setEventText(level.level.events[currentEvent].text[eventTextNumber]);
        setCurrentCards(level.level.events[currentEvent].cards);
        
    }, [currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        if (cardOption.name === "card0"){
            
        }
        setEventTextNumber(cardOption.nextEventText);
        setCurrentEvent(cardOption.nextEvent);
        lib.updateScore(cardOption.points);
    }

    const endGame = () => {
        const dif = lib.getScore() - startScore;
        service.postUserLeaderboard(lib.getNickname(), level.level._id, dif);
        navigate('./../LevelOverview');
    }

    return (
        <div className='app'>
            <>

                <div id="gamecontainer" className="container">
                    <div id="game">
                        <div id="event">
                            <div id="eventmessagecontainer">
                                <div id="eventmessage">
                                    <div id='event-text'>{!eventText ? "Loading..." : eventText}</div>
                                </div>
                            </div>
                        </div>
                        <div id="actionscontainer">
                            {!currentCards ? "Loading..." : currentCards.map((cardOption) => (
                                <button onClick={() => handleAnswerButtonClick(cardOption)}>{cardOption.text}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

export default Level4;
