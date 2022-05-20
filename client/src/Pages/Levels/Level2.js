import React, { useState } from "react";
import service from './../../service';
import { useNavigate } from 'react-router-dom';
import "../../index.css";
import lib from '../../library/bib.js';
import cardImages from '../../library/cardImages.js';
import orga from './../../images/cardImages/orga.png';


let protectionInstalled = false;
let networkSegmented = false;

let antivirusInstalled = false;
let seperatedNotPatchedICS = false;
let softwareWhitelisted = false;
let signaturesChecked = false;
let hacked = false;

let dataSecured = false;

let lost = false;
let gameOver = false;

let card20Played = false;


const cardsPlayed = [];
let level;

function Level2(props) {
    let navigate = useNavigate();

    const [currentEvent, setCurrentEvent] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    
    if (currentRound === 1) {
        lib.setLevelStartScore('level2');
        level = service.getLevel('level2');
        props.passLevelName(level.level.name);
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
        if (hacked && card20Played) {
            setEventText(level.level.events[currentEvent - 1].text[5]);
            card20Played = false;
        } else {
            setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
        }

        if (gameOver) {
            setCurrentCards(currentCards.filter(card => false));
        }
        
    }, [eventTextNumber, currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        setCurrentEvent(cardOption.nextEvent);
        setEventTextNumber(cardOption.nextEventText);
        setCurrentCards(currentCards.filter(card => card.name != cardOption.name));
        setCurrentRound(currentRound + 1);
        
        props.passPreviousScore(lib.getScore());
        lib.updateScore(cardOption.points);
        props.passCurrentScore(lib.getScore());

        if (cardOption.name == 'card1') {
            cardsPlayed.push('card9');
            cardsPlayed.push('card18');
        }
        if (cardOption.name == 'card2') {
            dataSecured = true;
            cardsPlayed.push('card10');
            cardsPlayed.push('card19');
        } 
        if (cardOption.name === 'card4') protectionInstalled = true;
        if (cardOption.name === 'card7') networkSegmented = true;
        if (cardOption.name == 'card10') {
            dataSecured = true;
            cardsPlayed.push('card19');
        }
        if (cardOption.name === 'card12') {
            cardsPlayed.push('card21');
            softwareWhitelisted = true;
        } 
        if (cardOption.name === 'card13') {
            cardsPlayed.push('card22');
        }
        if (cardOption.name === 'card14') {
            cardsPlayed.push('card23')
            signaturesChecked = true;
        }
        if (cardOption.name === 'card13') antivirusInstalled = true;
        if (cardOption.name === 'card15') seperatedNotPatchedICS = true;
        if (cardOption.name === 'card16') cardsPlayed.push('card24');
        if (cardOption.name === 'card20') card20Played = true;
        if (cardOption.name === 'card21') softwareWhitelisted = true;
        if (cardOption.name !== 'card22' && hacked && cardOption.name !== 'card25' && cardOption.name !== 'card20') {
            lost = true;
        }
        if (cardOption.name === 'card22') {
            hacked = false;
            if(cardOption.name === 'card22' && dataSecured) setEventTextNumber(13);
        } 
        if (cardOption.name === 'card23') signaturesChecked = true;
        
        
        if(cardOption.name === 'card25' && hacked) {
            setEventTextNumber(12);
        }


        if(networkSegmented && protectionInstalled) {
            networkSegmented = false;
            protectionInstalled = false;
            setCurrentEvent(2);
            setEventTextNumber(0);
        }

        if(antivirusInstalled && seperatedNotPatchedICS) {
            antivirusInstalled = false;
            seperatedNotPatchedICS = false;
            setCurrentEvent(3);
            setEventTextNumber(0);
        } else if (currentEvent === 2 && (softwareWhitelisted && signaturesChecked) || (softwareWhitelisted && antivirusInstalled) || (antivirusInstalled && signaturesChecked)) {
            lost = true;
        } else if (currentEvent === 2 && (softwareWhitelisted && seperatedNotPatchedICS) || (seperatedNotPatchedICS && signaturesChecked)) {
            antivirusInstalled = false;
            hacked = true;
            setCurrentEvent(3);
            setEventTextNumber(1);
        }
        if (lost) {
            setCurrentEvent(3);
            setEventTextNumber(2);
            gameOver = true;
        }
        if(currentEvent === 3 && signaturesChecked && softwareWhitelisted) {
            service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
            localStorage.setItem('levelNumber', '2');
            localStorage.setItem('feedback', 'Gratulation! Sie haben sich effektiv gegen Zero-Day-Exploits geschützt! Durch die Überprüfung der digitalen Signaturen haben Sie bei einer Software festgestellt, dass durch einen Zero-Day eine Backdoor geschaffen wurde, die wahrscheinlich für einen späteren Angriff gedacht war. Dies konnten Sie aber nun verhindern, bevor dieser Angriff durchgeführt wurde. Durch das Whitelisting haben Sie ebenfalls das Risikopotenzial auf zukünftige Zero-Days reduziert. Aber bleiben Sie trotzdem auf der Hut! Es kann auf der autorisierten Software trotzdem vorkommen, dass durch Zero-Days eine Infektion mit Schadsoftware möglich ist.');
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

export default Level2;