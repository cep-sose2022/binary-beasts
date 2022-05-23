import React, {useEffect, useRef, useState} from "react";
import mail from './../../images/level1/mail.jpg';
import login from './../../images/level1/login.jpg';
import download from './../../images/level1/download.jpg';
import service from './../../service';
import { useNavigate } from 'react-router-dom';
import lib from '../../library/bib.js';
//const level = service.getLevel('level5');

const cardsPlayed = [];
let rooms=0;
let fail=0;
let level;
function Level5(props) {

    // set score back to zero
    //lib.setLevelStartScore('level5');
    // save start score
    const startScore = lib.getScore();

    let navigate = useNavigate();
    // get level data from backend

    const [currentEvent, setCurrentEvent] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    if (currentRound === 1) {
        lib.setLevelStartScore('level5');
        level = service.getLevel('level5');
        props.passLevelName(level.level.name);
    }

    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    const [currentImage, setCurrentImage] = useState(mail);

    //refreshes Evettext and Currentcards
    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
        
        console.log(cardsPlayed);
        setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => !cardsPlayed.includes(card.name)));
    }, [currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        if(cardOption.name=="card2"){
            cardsPlayed.push('card2');
        }
        if(cardOption.name=="card3"){
            cardsPlayed.push('card3');
        }
        if(cardOption.name=="card4"){
            cardsPlayed.push('card4');
        }
        if(cardOption.name=="card5"){
            cardsPlayed.push('card5');
        }
        if(cardOption.name=="card56"){
            rooms++;
        }
        if(cardOption.name=="card1"){
            fail++;
        }
        
        setCurrentEvent(cardOption.nextEvent);
        setEventTextNumber(cardOption.nextEventText);
        setCurrentCards(currentCards.filter(card => card.name != cardOption.name));
        setCurrentRound(currentRound + 1);
        lib.updateScore(cardOption.points);
        
        /* if (cardOption.nextImage === 'mail') {
            setCurrentImage(mail);
        } else if (cardOption.nextImage === 'login') {
            setCurrentImage(login);
        } else if (cardOption.nextImage === 'download') {
            setCurrentImage(download);
        } else  */
        if (cardOption.nextEvent === 0 || rooms==4) {
            const dif = lib.getScore() - startScore;
            service.postUserLeaderboard(lib.getNickname(), level.level._id, dif);
            // save level number and feedback in local storage and navigate to win page
            localStorage.setItem('levelNumber', '1');
            localStorage.setItem('feedback', level.level.events[5].text[1]);
            navigate('../win');
        }
        if(fail==2){
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

export default Level5;