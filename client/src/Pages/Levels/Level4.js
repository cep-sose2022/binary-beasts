import React, {useState, useEffect, useRef} from "react";
import service from "../../service";
import { useNavigate } from "react-router-dom";
import lib from "../../library/bib";


const level = service.getLevel('level4');
const cardsPlayed = [];

let encryptDrive = false;
let isolatedNetwork = false;
let whitelisting = false;
let physicalLocks = false;
const history = ["event1"];

function Level4(props) { //external devices
    let navigate = useNavigate();
    const [currentEvent, setCurrentEvent] = useState(1);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    let startScore = lib.getScore(); 


    React.useEffect(() => {
        setEventText(level.level.events[currentEvent-1].text[eventTextNumber]);
        setCurrentCards(level.level.events[currentEvent-1].cards);
    }, [currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        console.log("history: " + history[history.length-1]);
        console.log("char: " + history[history.length-1].charAt(5));
        if (cardOption.name === "card0"){ 
            handleBaseEvent(cardOption);
        } else{
            history.concat(currentEvent.name); //add event to history
            setEventTextNumber(cardOption.nextEventText);
            setCurrentEvent(cardOption.nextEvent);
            console.log("history: " + history);
        }
        props.passPreviousScore(lib.getScore());
        lib.updateScore(cardOption.points);
        props.passCurrentScore(lib.getScore());
    }

    const handleBaseEvent = (cardOption) =>{
            let dynEvent = Number(history[history.length-1].charAt(5)) + 2; //get last event 
            setEventTextNumber(0); //all events that follow card0 only have one text
            setCurrentEvent(dynEvent);
            console.log("history: " + history + " - dynamisches Event: " + dynEvent);

        if (!encryptDrive){
            
        }
        if(!isolatedNetwork){

        }
        if(!whitelisting){

        }
        if(!physicalLocks){

        }
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
