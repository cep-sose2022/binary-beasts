import React, { useState } from "react";
import service from './../../service';
import { useNavigate } from 'react-router-dom';
import "../../index.css";
import lib from '../../library/bib.js';
import cardImages from '../../library/cardImages.js';

let playedCard2 = false;
let playedCard3 = false;
let playedCard11 = false;
let playedCard12 = false;
let playedCard14 = false;

let gameOver = false;

const cardsPlayed = ['card15'];

let level;
function Lvl1_Network(props) {
    let navigate = useNavigate();

    const [currentEvent, setCurrentEvent] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    if (currentRound === 1) {
        lib.setLevelStartScore('level1');
        level = service.getLevel('level1');
        props.passLevelName(level.level.name);
        playedCard2 = false;
        playedCard3 = false;
        playedCard11 = false;
        playedCard12 = false;
        playedCard14 = false;
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

        if (cardOption.name === 'card2') {
            cardsPlayed.push('card2');
            playedCard2 = true;
        }
        if (cardOption.name === 'card3') {
            cardsPlayed.push('card3');
            playedCard3 = true;
        }

        if (cardOption.name === 'card11') playedCard11 = true;
        if (cardOption.name === 'card12') playedCard12 = true;
        if (cardOption.name === 'card14') playedCard14 = true;
        if (cardOption.name === 'card15') gameOver = true;

        props.passPreviousScore(lib.getScore());

        if (playedCard2 && playedCard3 && cardOption.name !== 'card3' && currentEvent === 2) lib.updateScore(cardOption.points - 4);
        else if (playedCard2 && cardOption.name !== "card2" && currentEvent === 2) lib.updateScore(cardOption.points - 2);
        else if (playedCard3 && cardOption.name !== "card3" && currentEvent === 2) lib.updateScore(cardOption.points - 3);
        else lib.updateScore(cardOption.points);

        props.passCurrentScore(lib.getScore());


        if (cardOption.name === 'card4') {
            playedCard2 = false;
            playedCard3 = false;
        }

        if (playedCard11 && playedCard12 && playedCard14) {
            setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => card.name === 'card15'));
        }

        if(gameOver) {
            service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
            localStorage.setItem('levelNumber', '1');
            localStorage.setItem('feedback', 'Gratulation! Sie haben nun zusammen mit dem Netzwerktechniker alle nötigen Maßnahmen für eine sichere Netzwerksegmentierung vorgenommen! Achten Sie darauf, dass diese Maßnahmen auch in Ihrem Unternehmen umgesetzt werden, da dies ein wichtiger Teil der OT-Security ist. Auch wenn die Netzwerksegmentierung ein langer und teurer Prozess ist, lohnt sich dieser auf lange Sicht!');
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

export default Lvl1_Network;
