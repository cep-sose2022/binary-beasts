import React, {useEffect, useRef, useState} from "react";
import mail from './../../images/level1/mail.jpg';
import login from './../../images/level1/login.jpg';
import download from './../../images/level1/download.jpg';
import service from './../../service';
import { useNavigate } from 'react-router-dom';
import lib from '../../library/bib.js';

function Level1() {

    // set score back to zero
    lib.setLevelStartScore('level1');
    // save start score
    const startScore = lib.getScore();

    let navigate = useNavigate();
    // get level data from backend
    const level = service.getLevel('level1');
    const [currentEvent, setCurrentEvent] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    const [currentImage, setCurrentImage] = useState(mail);

    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
        setCurrentCards(level.level.events[currentEvent - 1].cards);
    }, [currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        setCurrentEvent(cardOption.nextEvent);
        setEventTextNumber(cardOption.nextEventText);
        setCurrentRound(currentRound + 1);
        lib.updateScore(cardOption.points);
        if (cardOption.nextImage === 'mail') {
            setCurrentImage(mail);
        } else if (cardOption.nextImage === 'login') {
            setCurrentImage(login);
        } else if (cardOption.nextImage === 'download') {
            setCurrentImage(download);
        } else if (cardOption.nextEvent === 0) {
            const dif = lib.getScore() - startScore;
            service.postUserLeaderboard(lib.getNickname(), level.level._id, dif);
            // save level number and feedback in local storage and navigate to win page
            localStorage.setItem('levelNumber', '1');
            localStorage.setItem('feedback', level.level.events[3].text[1]);
            navigate('../win');
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
                            <div id="eventimagecontainer">
                                <div id="eventimage">
                                    <img src={currentImage} className='img' />
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

export default Level1;