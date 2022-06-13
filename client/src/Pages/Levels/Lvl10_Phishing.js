import React from "react";
import {useState} from "react";
import mail from './../../images/level1/mail.jpg';
import login from './../../images/level1/login.jpg';
import download from './../../images/level1/download.jpg';
import ransomware from './../../images/level1/ransomware.jpg';
import service from './../../service';
import {useNavigate} from 'react-router-dom';
import lib from '../../library/bib.js';
import cardImages from '../../library/cardImages.js';
import {motion} from "framer-motion";

// set score back to zero
lib.setLevelStartScore('level1');
let level;
let cardsPlayed;
// get level data from backend


function Lvl10_Phishing(props) {

    let navigate = useNavigate();

    const [currentEvent, setCurrentEvent] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    
    if (currentRound === 1) {
        lib.setLevelStartScore('level10');
        level = service.getLevel('level10');
        props.passLevelName(level.level.name);
        props.passMaxScore(level.level.maxScore);
        cardsPlayed = [];
    }

    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    const [currentImage, setCurrentImage] = useState(mail);

    
    

    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
        setCurrentCards(level.level.events[currentEvent - 1].cards);
    }, [currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        cardsPlayed.push([cardOption.text[0], cardOption.feedback, cardOption.points >= 0]);
        setCurrentEvent(cardOption.nextEvent);
        setEventTextNumber(cardOption.nextEventText);
        setCurrentRound(currentRound + 1);

        props.passPreviousScore(lib.getScore());
        lib.updateScore(cardOption.points);
        props.passCurrentScore(lib.getScore());

        if (cardOption.nextImage === 'mail') {
            setCurrentImage(mail);
        } else if (cardOption.nextImage === 'login') {
            setCurrentImage(login);
        } else if (cardOption.nextImage === 'download') {
            setCurrentImage(download);
        } else if (cardOption.nextImage === 'ransomware') {
            setCurrentImage(ransomware);
        }
        else if (cardOption.nextEvent === 0) {
            if (lib.getScore() >= 0) {
                service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
            } else if (lib.getScore() < 0) {
                service.postUserLeaderboard(lib.getNickname(), level.level._id, 0);
            } if (cardOption.name === 'card11') {
                localStorage.setItem('feedback', level.level.events[5].text[1]);
            } else if (cardOption.name === 'card12') {
                localStorage.setItem('feedback', level.level.events[5].text[2]);
            }
            // save level number and feedback in local storage and navigate to win page
            localStorage.setItem('levelNumber', '10');
            navigate('../levelcompletion', {
                state: {
                    cardsPlayed: cardsPlayed
                }
            });
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
                            <div id="eventimagecontainer">
                                <div id="eventimage">
                                    <img src={currentImage} className='img' />
                                </div>
                            </div>
                        </div>
                        <div id="actionscontainer">
                            {!currentCards ? "Loading..." : currentCards.map((cardOption) => (
                                <motion.button onClick={() => handleAnswerButtonClick(cardOption)}
                                        key={cardOption.name}
                                               whileHover={{ scale: 1.1 }}
                                               whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}>
                                    <img src={cardImages.getCardImage(cardOption.image)}/>
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

export default Lvl10_Phishing;
