import React, { useState, useEffect, useRef } from "react";
import service from "../../service";
import { useNavigate } from "react-router-dom";
import lib, { getScore } from "../../library/bib";


const level = service.getLevel('level4');

let encryptDrive = false;
let isolatedNetwork = false;
let whitelisting = false;
let physicalLocks = false;
const cardsPlayed = [];
const nextEventHistory = [1]; //initially with 1 because event0 does not have "nextEvent"

let isScanned = false;

function Level4(props) { //external devices
    let navigate = useNavigate();
    const [currentEvent, setCurrentEvent] = useState(1);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [currentRound, setCurrentRound] = useState(1);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    let startScore = lib.getScore();

    let dynEvent;
    let dynEventText;

    //passing on levelName to game 
    if (currentRound === 1)
        props.passLevelName(level.level.name);


    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]); //-1 because eventName and eventNumber differ by 1

        //set cards 
        if (currentEvent === 1)
            setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => !cardsPlayed.includes(card.name))); //don't show already used cards
        else if (!isolatedNetwork)
            setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => card.name != ("card10" || "card21"))); // two events have one card less
        else
            setCurrentCards(level.level.events[currentEvent - 1].cards);

        console.log("history (useEffect): " + nextEventHistory + " - currenEvent: " + currentEvent);
    }, [currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        if (currentEvent === 1) {
            handleBaseEvent(cardOption);
        } else if (cardOption.name === "card0") {
            determineNextEvent(cardOption);
        }  else {
            nextEventHistory.push(cardOption.nextEvent); //add nextEvent to history
            checkExceptions(cardOption);
            setEventTextNumber(cardOption.nextEventText);
            setCurrentEvent(cardOption.nextEvent);
        }

        //render score
        props.passPreviousScore(lib.getScore());
        lib.updateScore(cardOption.points);
        props.passCurrentScore(lib.getScore());

        setCurrentRound(currentRound + 1);
    }

    /**
     * when card0 is clicked a different event is rendered depeding on the previous events
     */
    const determineNextEvent = (cardOption) => {
        dynEvent = nextEventHistory[nextEventHistory.length - 1]; //get the next event from history
        dynEventText = 0; //all events that follow card0 only have one text
        console.log("dynEvent (before): " + dynEvent);
        if (currentEvent === 14) {
            endGame();
            return;
        } else if (currentEvent === 1) { //basic event with security meassures 
            dynEvent = nextEventHistory[nextEventHistory.length - 1] + 1;
        } else if (currentEvent === dynEvent) { 
            dynEvent = 1;
        }
        else {
            console.log("something went wrong");
        }
        checkExceptions(cardOption);
        setEventTextNumber(dynEventText);
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
        } else //card5
            ;

        cardsPlayed.push(cardOption.name);
        console.log("cardsPlayed: " + cardsPlayed);
        determineNextEvent(cardOption);
    }

    const checkExceptions = (cardOption) => {
        if (cardOption.name === "card17") {
            isScanned = true;
        } else if (cardOption.name === "card16") {
            if (isScanned) {
                if (whitelisting)
                    dynEventText = 5;
                else
                    dynEventText = 4;
            }
        } else if (cardOption.name === "card18") {
            if (isScanned) {
                if (whitelisting)
                    dynEventText = 5;
            }
        } else if (cardOption.name === "card13") {
            //if encrypted show eventText0 else show eventText1
            if (encryptDrive)
                dynEventText = 0;
            else
                dynEventText = 1;
        } else if (cardOption.name === "card14") {
            //if !physicalLock show eventText2 else show eventText3
            if (physicalLocks) {
                dynEventText = 3;
            } else {
                dynEventText = 2;
            }
        }

    };

    const endGame = () => {
        const dif = lib.getScore() - startScore;
        service.postUserLeaderboard(lib.getNickname(), level.level._id, dif);
        localStorage.setItem('levelNumber', '4');
        localStorage.setItem('feedback', '- Noch zu erledigen - ');
        navigate('../win');
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
