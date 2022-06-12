import React from "react";
import useState from "react";
import service from './../../service';
import useNavigate from 'react-router-dom';
import "../../index.css";
import lib from '../../library/bib.js';
import cardImages from '../../library/cardImages.js';



let playedCard8 = false;
let playedCard9 = false;
let playedCard10 = false;
let playedCard11 = false;
let playedCard12 = false;

let playedCard15 = false;
let playedCard16 = false;

let gameOver = false;

let cardsPlayed;
let duplicates;

let level;
function Lvl4_RAccess(props) {
    let navigate = useNavigate();

    const [currentEvent, setCurrentEvent] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    if (currentRound === 1) {
        lib.setLevelStartScore('level4');
        level = service.getLevel('level4');
        props.passLevelName(level.level.name);
        props.passMaxScore(level.level.maxScore);
        playedCard8 = false;
        playedCard9 = false;
        playedCard10 = false;
        playedCard11 = false;
        playedCard12 = false;
        playedCard15 = false;
        playedCard16 = false;
        gameOver = false;
        cardsPlayed = [];
        duplicates = ['card17'];
    }

    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);


    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
        setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => !duplicates.includes(card.name)));
    }, [currentEvent]);

    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
    }, [eventTextNumber, currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        cardsPlayed.push([cardOption.text[0], cardOption.feedback, cardOption.points >= 0]);
        setCurrentEvent(cardOption.nextEvent);
        setEventTextNumber(cardOption.nextEventText);
        setCurrentCards(currentCards.filter(card => card.name != cardOption.name));
        setCurrentRound(currentRound + 1);

        if (cardOption.name === 'card8') playedCard8 = true;
        if (cardOption.name === 'card9') playedCard9 = true;
        if (cardOption.name === 'card10') playedCard10 = true;
        if (cardOption.name === 'card11') playedCard11 = true;
        if (cardOption.name === 'card12') playedCard12 = true;
        if (cardOption.name === 'card15') playedCard15 = true;
        if (cardOption.name === 'card16') playedCard16 = true;
        if (cardOption.name === 'card17') gameOver = true;

        if (playedCard8 && playedCard9 && playedCard10 && playedCard11 && playedCard12) {
            playedCard8 = false;
            setCurrentEvent(5);
            setEventTextNumber(0);
        }


        props.passPreviousScore(lib.getScore());
        lib.updateScore(cardOption.points);
        props.passCurrentScore(lib.getScore());

        if (playedCard15 && playedCard16) {
            setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => card.name === 'card17'));
        }

        if (gameOver) {
            service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
            localStorage.setItem('levelNumber', '4');
            localStorage.setItem('feedback', 'Gratulation! Sie haben nun zusammen mit dem IT-Administrator die wichtigsten Schritte für die Einrichtung eines sicheren Remote Access erarbeitet. Vergessen Sie nicht, dass die Verwendung eines Remote Access im Industrieumfeld trotz ihres praktischen Nutzens sicherheitstechnisch nicht zu empfehlen ist. Lässt es sich aber dennoch nicht verhindern, wissen Sie nun worauf Sie achten sollen. Ein kleiner Hinweis: In den meisten Industrieanlagen sind solche Konzepte für Remote Access bereits umgesetzt und in Nutzung, es schadet aber nicht, diese noch einmal auf die eben gelernten Kriterien zu überprüfen. Gerade Standardpasswörter sind keine Seltenheit in einer solchen Umgebung, da solche Anlagen zum Teil vor langer Zeit aufgebaut und konfiguriert wurden, als Remote Access noch überhaupt kein Thema war.');
            navigate('../levelcompletion', {
                state: {
                    cardsPlayed: cardsPlayed
                }
            });
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

export default Lvl4_RAccess;
