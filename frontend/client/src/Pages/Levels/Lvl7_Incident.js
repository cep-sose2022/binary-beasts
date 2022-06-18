import React from "react";
import {useState} from "react";

import angryboss from '../../images/level7/angryboss.PNG';
import maschine from '../../images/level7/maschine.PNG';
import router from '../../images/level7/router.PNG';
import schreibtisch from '../../images/level7/schreibtisch.PNG';
import serverroom from '../../images/level7/serverroom.PNG';
import start from '../../images/level7/start.PNG';
import sus from '../../images/level7/sus.PNG';
import bossoffice from '../../images/level7/bossoffice.PNG';
import produktion from '../../images/level7/produktion.PNG';
import tower from '../../images/level7/overheat.PNG';
import officedesk from '../../images/level7/officedesk.PNG';
import communityroom from '../../images/level7/gemeinschaftsraum.PNG';
import cardImages from '../../library/cardImages.js';
import {motion} from "framer-motion";



import service from '../../service';
import {useNavigate} from 'react-router-dom';
import lib from '../../library/bib.js';
//const level = service.getLevel('level5');

let cardsPlayed = [];
let roomcount = 0;
let fail = 0;
let level;

let rooms = [4, 3, 2, 1];//ranking
let cp = [];//cards played
let score = 0;
let rightcount = 0;
let penalty = 0;
let c = 0;
let cardFeedback;

function Lvl7_Incident(props) {
    // set score back to zero
    //lib.setLevelStartScore('level5');
    // save start score
    const startScore = lib.getScore();

    let navigate = useNavigate();
    // get level data from backend

    const [currentEvent, setCurrentEvent] = useState(1);
    const [currentRound, setCurrentRound] = useState(1);

    if (currentRound === 1) {
        lib.setLevelStartScore('level7');
        level = service.getLevel('level7');
        props.passLevelName(level.level.name);
        props.passMaxScore(level.level.maxScore);
        cardFeedback = [];
        cp = [];
        cardsPlayed = [];
    }

    const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
    const [eventText, setEventText] = useState(level.level.events[0].text[0]);
    const [eventTextNumber, setEventTextNumber] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentBG, setCurrentBG] = useState(start);

    //refreshes Evettext and Currentcards
    React.useEffect(() => {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);

        console.log(cardsPlayed);
        setCurrentCards(lib.shuffle(level.level.events[currentEvent - 1].cards.filter(card => !cardsPlayed.includes(card.name))));
    }, [currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        if(cardOption.feedback !== undefined) cardFeedback.push([cardOption.text[0], cardOption.feedback, cardOption.points >= 0]);
        function calc() {
            cp.push([c]);
            let rightroom = rooms[rightcount];
            let difference = rightroom - c;
            difference = Math.abs(difference);
            score = rightroom - difference - penalty;
            if (c == rightroom) {
                rightcount++;
                penalty = 0;
            }
            else {
                penalty++;
            }
        }

        if (cardOption.name == "card2") {
            cardsPlayed.push('card2');
            c = 4;
            calc();
        }
        if (cardOption.name == "card3") {
            cardsPlayed.push('card3');
            c = 3;
            calc();
        }
        if (cardOption.name == "card4") {
            cardsPlayed.push('card4');
            c = 2;
            calc();
        }
        if (cardOption.name == "card5") {
            cardsPlayed.push('card5');
            c = 1;
            calc();
        }
        if (cardOption.name == "card56") {
            roomcount++;
        }
        if (cardOption.name == "card1") {
            fail++;
        }

        setCurrentEvent(cardOption.nextEvent);
        setEventTextNumber(cardOption.nextEventText);
        setCurrentCards(currentCards.filter(card => card.name != cardOption.name));
        setCurrentRound(currentRound + 1);
        props.passPreviousScore(lib.getScore());
        lib.updateScore(cardOption.points + score);
        props.passCurrentScore(lib.getScore());

        if (cardOption.name === 'card56') {
            setCurrentBG(start);
            setCurrentImage(null);
        }
        else if (cardOption.nextImage === 'angryboss') {
            setCurrentImage(angryboss);
            setCurrentBG(bossoffice);
        } else if (cardOption.nextImage === 'maschine') {
            setCurrentImage(maschine);
            setCurrentBG(produktion);
        } else if (cardOption.nextImage === 'router') {
            setCurrentImage(router);
            setCurrentBG(communityroom);
        } else if (cardOption.nextImage === 'schreibtisch') {
            setCurrentImage(schreibtisch);
            setCurrentBG(officedesk);
        } else if (cardOption.nextImage === 'serverroom') {
            setCurrentImage(tower);
            setCurrentBG(serverroom);
        } else if (cardOption.nextImage === 'sus') {
            setCurrentImage(sus);
        }

        if (cardOption.nextEvent === 0 || roomcount == 4) {
            service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
            localStorage.setItem('levelNumber', '7');
            localStorage.setItem('feedback', 'Sie haben das Level erfolgreich beendet!');
            navigate('../levelcompletion', {
                state: {
                    cardsPlayed: cardFeedback
                }
            });
        }
        if (fail == 2) {
            service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
            localStorage.setItem('levelNumber', '7');
            localStorage.setItem('feedback', 'Sie haben leider verloren!');
            navigate('../levelcompletion', {
                state: {
                    cardsPlayed: cardFeedback
                }
            });
        }
    }

    return (
        <div className='app'>
            <>
                <div id="backgroundlvl5container"><img id="backgroundlvl5" src={currentBG}></img></div>
                <div id="gamecontainerlvl5" className="container">
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
                                               whileHover={{ scale: 1.1 }}
                                               whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}>

                                    <img src={!cardOption.image ? cardImages.getCardImage('empty') : cardImages.getCardImage(cardOption.image)} />
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

export default Lvl7_Incident;
