import React, {useState} from "react";
import service from './../../service';
import { useNavigate } from 'react-router-dom';
import lib from '../../library/bib.js';
import cardImages from '../../library/cardImages.js';

// set score back to zero
lib.setLevelStartScore('level6');

let level;

function Lvl6_Monitoring(props) {

    let navigate = useNavigate();

    const [currentEvent, setCurrentEvent] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    if (currentRound === 1) {
        lib.setLevelStartScore('level6');
        level = service.getLevel('level6');
        props.passLevelName(level.level.name);
        props.passMaxScore(level.level.maxScore);
    }

    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [eventTextNumber, setEventTextNumber] = useState(0);

    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
        setCurrentCards(level.level.events[currentEvent - 1].cards);
    }, [currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        setCurrentEvent(cardOption.nextEvent);
        setEventTextNumber(cardOption.nextEventText);
        setCurrentRound(currentRound + 1);

        props.passPreviousScore(lib.getScore());
        lib.updateScore(cardOption.points);
        props.passCurrentScore(lib.getScore());

        if (cardOption.nextEvent === 0) {
            if (lib.getScore() >= 0) {
                service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
            } else if (lib.getScore() < 0) {
                service.postUserLeaderboard(lib.getNickname(), level.level._id, 0);
            } if (cardOption.name === 'card18') {
                localStorage.setItem('feedback', level.level.events[8].text[0]);
            } else if (cardOption.name === 'card19') {
                localStorage.setItem('feedback', level.level.events[8].text[1]);
                console.log('card34');
            }
            // save level number and feedback in local storage and navigate to win page
            localStorage.setItem('levelNumber', '6');
            navigate('../levelcompletion');
        }
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
                                    <img src={cardImages.getCardImage(cardOption.image)}/>
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

export default Lvl6_Monitoring;