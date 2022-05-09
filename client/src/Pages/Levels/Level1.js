import React, {useEffect, useRef, useState} from "react";
import mail from './../../images/level1/mail.jpg';
import login from './../../images/level1/login.jpg';
import download from './../../images/level1/download.jpg';
import service from './../../service';
import {useNavigate} from 'react-router-dom';
import lib from '../../library/bib.js';

lib.setLevelStartScore('level1');
const startScore = lib.getScore();

function Level1() {

    // Timer
    const startingMinutes = 4;
    const startingSeconds = 0;
    const [mins, setMinutes] = useState(startingMinutes);
    const [secs, setSeconds] = useState(startingSeconds);
    useEffect(() => {
        let sampleInterval = setInterval(() => {
            if (secs > 0) {
                setSeconds(secs - 1);
            }
            if (secs === 0) {
                if (mins === 0) {
                    const dif = lib.getScore() - startScore;
                    service.postUserLeaderboard(lib.getNickname(), level.level._id, dif);
                    navigate('./../LevelOverview');
                } else {
                    setMinutes(mins - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            clearInterval(sampleInterval);
        };
    });


    let navigate = useNavigate();
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
            navigate('./../LevelOverview');
        }
    }

    return (
        <div className='app'>
            <>
                
            <nav className="gameNavbar">
            {/* <div class="background"><img src={background} alt="not found"></img></div> */}
            <div id="navlevelround"className="navgamecontent">
                <p>Level: <span>1</span> </p>
                <p>Round: <span>{currentRound}</span> </p>
            </div>
            <div className="navgamecontent">
                <p>Time: <span>{mins}:{secs < 10 ? `0${secs}` : secs}</span> </p>
            </div>
            <div id="score" className="navgamecontent">
                <p>Score: <span>{lib.getScore()}</span></p>
            </div>
            
        </nav>
        <div className="gamecontainer">
            <div id="game">
                <div id="event">
                    <div id="eventmessagecontainer">
                            <div id="eventmessage">
                            <div className='event-text'>{!eventText ? "Loading..." : eventText}</div>
                            </div>
                    </div>
                    <div id="eventimagecontainer">
                        <div id="eventimage">
                        <img src={currentImage} className='img'/>
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
                
                {/* <div className='images'>
                    <img src={currentImage} className='img'/>
                </div>
                <div className='cards'>
                    {!currentCards ? "Loading..." : currentCards.map((cardOption) => (
                        <button onClick={() => handleAnswerButtonClick(cardOption)}>{cardOption.text}</button>
                    ))}
                </div>
                <div className='questions'>
                    <br/>
                    <div className='event-text'>{!eventText ? "Loading..." : eventText}</div>
                </div> */}
            </>
        </div>
    );
}

export default Level1;