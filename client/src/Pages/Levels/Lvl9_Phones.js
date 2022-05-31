import React, { useState } from "react";
import service from './../../service';
import { useNavigate } from 'react-router-dom';
import "../../index.css";
import lib from '../../library/bib.js';
import cardImages from '../../library/cardImages.js';


let gameOver = false;

const cardsPlayed = [];

let level;
function Lvl9_Phones(props) {
    let navigate = useNavigate();

    const [currentEvent, setCurrentEvent] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    if (currentRound === 1) {
        lib.setLevelStartScore('level9');
        level = service.getLevel('level9');
        props.passLevelName(level.level.name);
        props.passMaxScore(level.level.maxScore);
        gameOver = false;
    }

    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);


    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
        setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => !cardsPlayed.includes(card.name)));
    }, [currentEvent]);

    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
    }, [eventTextNumber, currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        setCurrentEvent(cardOption.nextEvent);
        setEventTextNumber(cardOption.nextEventText);
        setCurrentCards(currentCards.filter(card => card.name != cardOption.name));
        setCurrentRound(currentRound + 1);

        props.passPreviousScore(lib.getScore());
        lib.updateScore(cardOption.points);
        props.passCurrentScore(lib.getScore());


       
        if(gameOver) {
            service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
            localStorage.setItem('levelNumber', '9');
            localStorage.setItem('feedback', 'Gratulation! Auch wenn die Konfiguration von Smartphones im Produktionsumfeld ein langer und teurer Prozess ist, lohnt sich dieser auf lange Sicht!');
            navigate('../levelcompletion');
        }
    }

    const eventTextSplit = () => {
        //Bei jedem '<' im eventText wird ein br-Tag eingebaut
        const wrapped = eventText.split('<').reduce((prev, cur) => [...prev, cur, <br />], [])
        return wrapped;
    };

    return (
        <div className='app'>
            <>
                <div id="gamecontainer" className="container">
                    <div id="game">
                        <div id="event">
                            <div id="eventmessagecontainer">
                                <div id="eventmessage">
                                    <div id='event-text'>{!eventText ? "Loading..." : eventTextSplit()}</div>
                                </div>
                            </div>
                            <div id="eventimagecontainer">
                                <div id="eventimage">
                                    <img src={currentImage} className='img' />
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

export default Lvl9_Phones;
