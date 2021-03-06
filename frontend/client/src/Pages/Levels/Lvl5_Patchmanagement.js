import React from "react";
import {useState} from "react";
import service from '../../service';
import {useNavigate} from 'react-router-dom';
import "../../index.css";
import lib from '../../library/bib.js';
import cardImages from '../../library/cardImages.js';
import {motion} from "framer-motion";


let level;
let cardsPlayed;
let duplicates;
function Lvl5_Patchmanagement(props) {

  let navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);

  if (currentRound === 1) {
    lib.setLevelStartScore('level5');
    level = service.getLevel('level5');
    props.passLevelName(level.level.name);
    props.passMaxScore(level.level.maxScore);
    cardsPlayed = [];
    duplicates = ['card14'];
  }

  const [currentCards, setCurrentCards] = useState(level.level.events[0].cards);
  const [eventText, setEventText] = useState(level.level.events[0].text[0]);
  const [eventTextNumber, setEventTextNumber] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);

  const [usbInfected, setUsbInfected] = useState(false);
  const [compatibilityChecked, setCombatibilityChecked] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const [patchDocumented, setPatchDocumented] = useState(false);
  const [cardSevenPlayed, setCardSevenPlayed] = useState(false);
  const [cardElevenPlayed, setCardElevenPlayed] = useState(false);
  const [card13Played, setCard13Played] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  React.useEffect(() => {
    //setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
    if (currentEvent == 3 && patchDocumented) {
      setCurrentCards(lib.shuffle(level.level.events[currentEvent - 1].cards.filter(card => card.name != 'card10').filter(card => !duplicates.includes(card.name))));
    } else {
      setCurrentCards(lib.shuffle(level.level.events[currentEvent - 1].cards.filter(card => !duplicates.includes(card.name))));
    }
  }, [currentEvent]);

  React.useEffect(() => {
    if (usbInfected && cardSevenPlayed) {
      setEventText(level.level.events[currentEvent - 1].text[4]);
      setCardSevenPlayed(false);
      setUsbInfected(false);
    } else if (!compatibilityChecked && usbInfected && dataSaved && currentEvent == 3) {
      setEventText(level.level.events[currentEvent - 1].text[9]);
      setCombatibilityChecked(true);
      setUsbInfected(false);
    } else if (!compatibilityChecked && usbInfected && currentEvent == 3) {
      setEventText(level.level.events[currentEvent - 1].text[3]);
      setCombatibilityChecked(true);
      setUsbInfected(false);
    } else if (!compatibilityChecked && dataSaved && currentEvent == 3) {
      setEventText(level.level.events[currentEvent - 1].text[10]);
      setCombatibilityChecked(true);
    } else if (usbInfected && currentEvent == 3) {
      setEventText(level.level.events[currentEvent - 1].text[1]);
      setUsbInfected(false);
    } else if (!compatibilityChecked && currentEvent == 3) {
      setEventText(level.level.events[currentEvent - 1].text[2]);
      setCombatibilityChecked(true);
    } else if (cardElevenPlayed && !patchDocumented) {
      setEventText(level.level.events[currentEvent - 1].text[6]);
      setCardElevenPlayed(false);
    } else {
      setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
      setCardSevenPlayed(false);
    }
  }, [eventTextNumber, currentEvent]);

  const handleAnswerButtonClick = (cardOption) => {
    if(cardOption.feedback !== undefined) cardsPlayed.push([cardOption.text[0], cardOption.feedback, cardOption.points >= 0]);
    setCurrentEvent(cardOption.nextEvent);
    setEventTextNumber(cardOption.nextEventText);
    setCurrentCards(currentCards.filter(card => card.name != cardOption.name));
    setCurrentRound(currentRound + 1);

    props.passPreviousScore(lib.getScore());
    lib.updateScore(cardOption.points);
    props.passCurrentScore(lib.getScore());


    if (cardOption.name == 'card4') {
      setCombatibilityChecked(true);
    }

    if (cardOption.name == 'card6') {
      setUsbInfected(true);
    }

    if (cardOption.name == 'card7') {
      setCardSevenPlayed(true);
    }

    if (cardOption.name == 'card8') {
      setDataSaved(true);
    }

    if (cardOption.name == 'card9') {
      setPatchDocumented(true);
    }

    if (cardOption.name == 'card11') {
      setCardElevenPlayed(true);
    }

    if (cardOption.name == 'card12' || cardOption.name == 'card13') {
      setGameOver(true);
      if(cardOption.name == 'card13') setCard13Played(true);
      setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => card.name === 'card14'));
    }

    if (gameOver) {
      setCurrentCards(currentCards.filter(card => false));
      service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
      localStorage.setItem('levelNumber', '5');
      if(card13Played) localStorage.setItem('feedback', "Schade! Sie h??tten nicht auf den Sicherheitspatch warten sollen, sondern andere Ma??nahmen ergreifen sollen. Da Sie dies nicht getan haben, haben Hacker in der Zwischenzeit die Schwachstelle des Patches ausgenutzt und haben nun die Kontrolle ??ber das ICS-System!");
      else localStorage.setItem('feedback', "Gratulation! Sie haben nun den Vorgang der Installation von Patches erfolgreich gemeistert! Behalten Sie im Hinterkopf, regelm????ig nach Sicherheitspatches Ausschau zu halten. Beachten Sie ebenfalls, dass nicht immer Sicherheitspatches f??r ICS-Ger??te verf??gbar sind oder eine Installation oft nicht m??glich ist. In solchen F??llen sollte immer eine Risikoanalyse mit alternativen Ausgleichsma??nahmen wie die im Beispiel erfolgte Netzsegmentierung erfolgen. Machen Sie es Hackern nicht durch veraltete Systeme einfach!");
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
          <motion.div id="game"
                      initial={{ opacity: 0, translateX: 100, translateY: -100 }}
                      animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                      transition={{ duration: 1.1 }}>
            <div id="event">
              <div id="eventmessagecontainer">
                <div id="eventmessage">
                  <div id='event-text'>{!eventText ? "Loading..." : eventTextSplit()}</div>
                </div>
              </div>
              {/* <div id="eventimagecontainer">
                <div id="eventimage">
                  <img src={currentImage} className='img' />
                </div>
              </div> */}
            </div>
            <div id="actionscontainer">
              {!currentCards ? "Loading..." : currentCards.map((cardOption) => (
                <motion.button onClick={() => handleAnswerButtonClick(cardOption)}
                               whileHover={{ scale: 1.1 }}
                               whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}>
                  <img src={cardImages.getCardImage(cardOption.image)} />
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

export default Lvl5_Patchmanagement;
