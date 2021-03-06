import React from "react";
import {useState} from "react";
import service from "../../service";
import {useNavigate} from "react-router-dom";
import lib from "../../library/bib";
import cardImages from '../../library/cardImages.js';
import {motion} from "framer-motion";

const level = service.getLevel('level3');
const baseEvent = 1; //event1 is basic event with security meassures 
const lastCard = "card28";

//baseEvent cards
let encryptDrive = false;
let isolatedNetwork = false;
let whitelisting = false;
let physicalLocks = false;

let duplicates;
let cardsPlayed;
let nextEventHistory = [baseEvent]; //initialized because baseEvent does not have "nextEvent"

let isScanned = false;
let isIsolatedChecked = false;

function Lvl3_Devices(props) {
    let navigate = useNavigate();
    const [currentEvent, setCurrentEvent] = useState(1);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [currentRound, setCurrentRound] = useState(1);
    const [eventTextNumber, setEventTextNumber] = useState(0);

    let dynEvent;
    let dynEventText;

    //passing on levelName to game and reset all variables
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
        nextEventHistory = [1];
    }

    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]); //-1 because eventName and eventNumber differ by 1

        //set cards 
        if (currentEvent === 1)
            setCurrentCards(lib.shuffle(level.level.events[currentEvent - 1].cards.filter(card => !duplicates.includes(card.name)))); //don't show already used cards
        else if (!isolatedNetwork) {
            setCurrentCards(lib.shuffle(level.level.events[currentEvent - 1].cards.filter(card => (card.name !== "card10" && card.name !== "card21")))); // two events have one card less
        } else if (isIsolatedChecked)
            setCurrentCards(lib.shuffle(level.level.events[currentEvent - 1].cards.filter(card => card.name !== ("card23")))); //event11
        else
            setCurrentCards(lib.shuffle(level.level.events[currentEvent - 1].cards));
    }, [currentEvent, eventTextNumber]);

    const handleAnswerButtonClick = (cardOption) => {
        if (cardOption.name === lastCard) {
            endGame();
        }
        cardsPlayed.push([cardOption.text[0], cardOption.feedback, cardOption.points >= 0]);

        //decide how to handle click
        if (currentEvent === baseEvent) {
            handleBaseEvent(cardOption);
        } else if (cardOption.name === "card0") {
            determineNextEvent(cardOption);
        } else { //normal card
            nextEventHistory.push(cardOption.nextEvent);
            if (!checkExceptions(cardOption)) {
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
        dynEvent = nextEventHistory[nextEventHistory.length - 1];
        dynEventText = 0; //all events that follow card0 only have one text
        if (currentEvent === baseEvent) {
            if (nextEventHistory[nextEventHistory.length - 1] === 4) { //avoid loop between event4 and event5
                dynEvent = 6;
                dynEventText = 0;
            } else {
                dynEvent = nextEventHistory[nextEventHistory.length - 1] + 1;
            }
        } else if (currentEvent === dynEvent) {
            if(encryptDrive && physicalLocks && isolatedNetwork && whitelisting){ //all baseEvent-cards played -> skip baseEvent
                dynEvent = nextEventHistory[nextEventHistory.length -1] +1;
            } else {
                dynEvent = baseEvent;
            }
        }
        else {
            console.log("something went wrong");
        }
        checkExceptions(cardOption);
        setEventTextNumber(dynEventText);
        setCurrentEvent(dynEvent);
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

        if (cardOption.name !== "card5")
            duplicates.push(cardOption.name);
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
                    dynEventText = 5;
                } else
                    dynEventText = 2;
                break;
            case "card13":
                if (encryptDrive)
                    dynEventText = 0;
                else
                    dynEventText = 1;
                break;
            case "card14":
                if (physicalLocks || encryptDrive)
                    dynEventText = 3;
                else
                    dynEventText = 2;
                break;
            case "card21":
                isIsolatedChecked = true;
                dynEventText = 1;
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
                isException = false; //if no exception occurs
                break;
        }
        return isException;
    };

    const endGame = () => {
        service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
        localStorage.setItem('levelNumber', '3');
        localStorage.setItem('feedback', 'Wie Sie bemerkt haben kann so ein einfacher USB-Stick schnell zum Verh??ngnis f??r die ganze Anlage sein. Deswegen sollte man immer auf den richtigen Umgang achten, sodass man es Angreifern m??glichst schwer macht in das System einzudringen.');
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
                    <motion.div id="game"
                                initial={{ opacity: 0, translateX: 100, translateY: -100 }}
                                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                                transition={{ duration: 1.1 }}>
                        <div id="event">
                            <div id="eventmessagecontainer">
                                <div id="eventmessage">
                                    <div id='event-text'>{!eventText ? "Loading..." : eventText}</div>
                                </div>
                            </div>
                        </div>
                        <div id="actionscontainer">
                            {!currentCards ? "Loading..." : currentCards.map((cardOption) => (
                                <motion.button onClick={() => handleAnswerButtonClick(cardOption)}
                                               whileHover={{ scale: 1.1 }}
                                               whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}>
                                    { cardOption.image && <img alt="Kartenbild" src={cardImages.getCardImage(cardOption.image)} />}
                                    <br />
                                    {cardOption.text}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </>
        </div>
    );
}

export default Lvl3_Devices;
