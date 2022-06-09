import React, { useState, useEffect, useRef } from "react";
import service from "../../service";
import { useNavigate } from "react-router-dom";
import lib, { getScore } from "../../library/bib";
import cardImages from '../../library/cardImages.js';


const level = service.getLevel('level3');

let encryptDrive = false;
let isolatedNetwork = false;
let whitelisting = false;
let physicalLocks = false;

let duplicates;
let cardsPlayed;

const nextEventHistory = [1]; //initially with 1 because event0 does not have "nextEvent"

let isScanned = false;
let isIsolatedChecked = false;

function Lvl3_Devices(props) { //external devices
    let navigate = useNavigate();
    const [currentEvent, setCurrentEvent] = useState(1);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [currentRound, setCurrentRound] = useState(1);
    const [eventTextNumber, setEventTextNumber] = useState(0);

    let dynEvent;
    let dynEventText;

    //passing on levelName to game and reset all devices
    if (currentRound === 1) {
        props.passLevelName(level.level.name);
        props.passMaxScore(level.level.maxScore);
        encryptDrive = false;
        isolatedNetwork = false;
        whitelisting = false;
        physicalLocks = false;
        isScanned = false;
        isIsolatedChecked = false;
        duplicates = [];
        cardsPlayed = [];
    }
        
    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]); //-1 because eventName and eventNumber differ by 1

        //set cards 
        if (currentEvent === 1)
            setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => !duplicates.includes(card.name))); //don't show already used cards
        else if (!isolatedNetwork) {
            setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => (card.name != "card10" && card.name != "card21"))); // two events have one card less
        }    else if (isIsolatedChecked)
            setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => card.name != ("card13"))); //event11
        else
            setCurrentCards(level.level.events[currentEvent - 1].cards);

        console.log("history (useEffect): " + nextEventHistory + " - currenEvent: " + currentEvent + " - currentEventText: " + eventTextNumber);
    }, [currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        cardsPlayed.push([cardOption.text[0], cardOption.feedback, cardOption.points >= 0]);
        if (currentEvent === 1) {
            handleBaseEvent(cardOption);
        } else if (cardOption.name === "card0") {
            determineNextEvent(cardOption);
        } else {
            nextEventHistory.push(cardOption.nextEvent); //add nextEvent to history

            console.log(checkExceptions(cardOption));
            if (!checkExceptions(cardOption)) { // if there are no exceptions
                setEventTextNumber(cardOption.nextEventText);
            } else {
                setEventTextNumber(dynEventText);
            }
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

        console.log("dynEvent (after): " + dynEvent + " / dynEventText: " + dynEventText);
    }

    const handleBaseEvent = (cardOption) => {
        switch (cardOption.name) {
            case "card1":
                encryptDrive = true;
                break;
            case "card2":
                whitelisting = true;
                break;
            case "card3":
                physicalLocks = true;
                break;
            case "card4":
                isolatedNetwork = true;
                break;
            default:
                break;
        }

        if(cardOption.name != "card5")
            duplicates.push(cardOption.name);

        console.log("cardsPlayed: " + duplicates);
        determineNextEvent(cardOption);
    }

    /**
    *    sets the next event text if an exception occurs
    *  when a case applies the dynEventText has to be set, either to the alternative eventText -> if(true)
    *       or to the eventText in Database otherwise it won't show any text because the function returns true eitherway
    */
    const checkExceptions = (cardOption) => {
        let isException = true;
        switch (cardOption.name) {
            case "card17":
                isScanned = true;
                dynEventText = 0;
                break;
            case "card16":
                if (isScanned) {
                    if (whitelisting)
                        dynEventText = 5;
                    else
                        dynEventText = 4;
                } else
                    dynEventText = 0;
                break;
            case "card18":
                if (isScanned) {
                    // if (whitelisting)
                    dynEventText = 5;
                } else
                    dynEventText = 1;
                break;
            case "card13":
                if (encryptDrive)
                    dynEventText = 0;
                else
                    dynEventText = 1;
                break;
            case "card14":
                if (physicalLocks)
                    dynEventText = 3;
                else
                    dynEventText = 2;
                break;
            case "card21":
                isIsolatedChecked = true;
                break;
            case "card22":
                if (isIsolatedChecked)
                    dynEventText = 1;
                else
                    dynEventText = 0;
                break;
            case "card6":
                if (whitelisting)
                    dynEventText = 4;
                else
                    dynEventText = 0;
                break;
            default:
                isException = false;
                break;
        }
        return isException; //if no exception occurs it returns false
    };

    const endGame = () => {
        service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
        localStorage.setItem('levelNumber', '3');
        localStorage.setItem('feedback', 'Wie Sie bemerkt haben kann so ein einfacher USB-Stick schnell zum Verhängnis für die ganze Anlage sein. Deswegen sollte man immer auf den richtigen Umgang achten, sodass man es Angreifern möglichst schwer macht in das System einzudringen.');
        navigate('../levelcompletion', {
            state: {
                cardsPlayed: cardsPlayed
            }
        });

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
                                <button onClick={() => handleAnswerButtonClick(cardOption)}>
                                    <img src={cardImages.getCardImage(cardOption.image)} />
                                    <br />
                                    {cardOption.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

export default Lvl3_Devices;
