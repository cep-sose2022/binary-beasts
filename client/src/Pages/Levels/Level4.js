import React, { useState, useEffect, useRef } from "react";
import service from "../../service";
import { useNavigate } from "react-router-dom";
import lib from "../../library/bib";


const level = service.getLevel('level4');
const cardsPlayed = [];

let encryptDrive = false;
let isolatedNetwork = false;
let whitelisting = false;
let physicalLocks = false;
const nextEventHistory = [1]; //because event0 does not have "nextEvent"

function Level4(props) { //external devices
    let navigate = useNavigate();
    const [currentEvent, setCurrentEvent] = useState(1);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    let startScore = lib.getScore();


    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]); //-1 because eventName and eventNumber differ by 1
        setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => !cardsPlayed.includes(card.name)));
        console.log("history (useEffect): " + nextEventHistory + " - currenEvent: " + currentEvent);
    }, [currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        if(currentEvent === 1){ 
            handleBaseEvent(cardOption);
        } else if (cardOption.name === "card0"){
            determineNextEvent(cardOption);
        } else {
            nextEventHistory.push(cardOption.nextEvent); //add nextEvent to history
            setEventTextNumber(cardOption.nextEventText);
            setCurrentEvent(cardOption.nextEvent);
        }
        props.passPreviousScore(lib.getScore());
        lib.updateScore(cardOption.points);
        props.passCurrentScore(lib.getScore());
    }

    /**
     * when card0 is clicked a different event is rendered depeding on the previous events
     */
    const determineNextEvent = (cardOption) => {
        let dynEvent = nextEventHistory[nextEventHistory.length - 1] ; //get the next event from history
        console.log("dynEvent (before): " + dynEvent);
        if (currentEvent === 1) { //basic event with security meassures 
            dynEvent = nextEventHistory[nextEventHistory.length - 1]+1; 
        } else if (currentEvent === dynEvent) { //
            dynEvent = 1; 
        }
        else {
            console.log("something went wrong");
        }
        setEventTextNumber(0); //all events that follow card0 only have one text
        setCurrentEvent(dynEvent);
        console.log("dynEvent (after): " + dynEvent);
    }

    const handleBaseEvent = (cardOption) => {
        if (cardOption.name === "card1") {
            encryptDrive = true;
        } else if (cardOption.name === "card2") {
            whitelisting = true;
        } else if (cardOption.name === "card3") {
            physicalLocks = true;
        } else if (cardOption.name === "card4") {
            isolatedNetwork = true;
        } else
            ;

        cardsPlayed.push(cardOption.name);

        determineNextEvent(cardOption);
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
