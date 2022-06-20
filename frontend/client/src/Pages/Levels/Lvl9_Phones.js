import React from "react";
import {useState} from "react";
import service from '../../service';
import {useNavigate} from 'react-router-dom';
import "../../index.css";
import lib from '../../library/bib.js';
import cardImages from '../../library/cardImages.js';
import {motion} from "framer-motion";

let gameOver = false;
let money = 16000; //start money that is needed for perfect path 
let cardsPlayed;
let duplicate;
let level;
const lastCard = "card43";

function Lvl9_Phones(props) {
    let navigate = useNavigate();
    let feedback = "Sie haben noch "+ money + "€ übrig. Wichtig ist, dass Smartphones im Produktionsumfeld nur die wirklich nötigen Apps und Zugriffsrechte haben und nach außen hin abgesichert sind, sodass sich kein Hacker Zugang zum ICS schaffen kann.";

    const [currentEvent, setCurrentEvent] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    const [isEnoughMoney, setIsEnoughMoney] = useState(true);

    if (currentRound === 1) {
        lib.setLevelStartScore('level9');
        level = service.getLevel('level9');
        props.passLevelName(level.level.name);
        props.passMaxScore(level.level.maxScore);
        cardsPlayed = [];
        duplicate = []; //avoids strange lines in played cards table in levelcompletion
        gameOver = false;
        money = 16000; // start money 
    }

    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);


    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
        setCurrentCards(lib.shuffle(level.level.events[currentEvent - 1].cards.filter(card => !duplicate.includes(card.name))));
    }, [currentEvent]);

    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
        setIsEnoughMoney(true); //every new card selection removes error-text
    }, [eventTextNumber, currentEvent]);
    
    const handleAnswerButtonClick = (cardOption) => {
        //check end-conditions
        if(cardOption.name === lastCard){
            gameOver = true;
        }
        if (gameOver) {
            service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
            localStorage.setItem('levelNumber', '9');
            localStorage.setItem('feedback', feedback);
            navigate('../levelcompletion', {
                state: {
                    cardsPlayed: cardsPlayed //for showing played cards in levelcompletion
                }
            });
        }
        
        //"buy" a card
        if (money >= cardOption.costs){
            money -= cardOption.costs;
            //private devices are ignored -> have to buy new devices
            if(cardOption.name==="card1") {
                money -= 5000;
            }
            cardsPlayed.push([cardOption.text, cardOption.feedback, cardOption.points >= 0]);
            setCurrentEvent(cardOption.nextEvent);
            setEventTextNumber(cardOption.nextEventText);
            setCurrentCards(currentCards.filter(card => card.name != cardOption.name)); //remove cards after played
            setCurrentRound(currentRound + 1);
            //update score
            props.passPreviousScore(lib.getScore());
            lib.updateScore(cardOption.points);
            props.passCurrentScore(lib.getScore());
        }
        else {  
            setIsEnoughMoney(false);
        }

        if (money === 0) {
            var lastEvent = 8;
            var eventTextOutOfMoney = 0;
            setCurrentEvent(lastEvent);
            setEventTextNumber(eventTextOutOfMoney);
            setCurrentCards(level.level.events[lastEvent].cards);
        }

        //check events that contain cards with loopback 
        if (currentEvent === 3 || currentEvent === 4) {
            duplicate.push(cardOption.name);
        }

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
                            
                                <div id= {isEnoughMoney ? "money-container" : "money-error-container"}>
                                    <p id="money" name="money">Geld: {money}</p>
                                    {!isEnoughMoney && 
                                        <p id="money-error" name="money-error">Das Geld reicht nicht mehr</p>
                                    }
                                </div>
                          
                        </div>
                        <div id="actionscontainer">
                            {!currentCards ? "Loading..." : currentCards.map((cardOption) => (
                                <motion.button onClick={() => handleAnswerButtonClick(cardOption)}
                                               whileHover={{ scale: 1.1 }}
                                               whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}>
                                    <img src={cardImages.getCardImage(cardOption.image)} />
                                    <br />
                                    {cardOption.text}
                                    <br />
                                    {cardOption.name != "card43"  ? cardOption.costs + "€" : ""}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </>
        </div>
    );
}

export default Lvl9_Phones;
