import React, { useState } from "react";
import service from './../../service';
import { useNavigate } from 'react-router-dom';
import "../../index.css";
import lib from '../../library/bib.js';
import cardImages from '../../library/cardImages.js';


let level;
function Level3(props) {

  let navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);

  if (currentRound === 1) {
    lib.setLevelStartScore('level3');
    level = service.getLevel('level3');
    props.passLevelName(level.level.name);
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
      setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => card.name != 'card10'));
    } else {
      setCurrentCards(level.level.events[currentEvent - 1].cards);
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

    if (gameOver) {
      setCurrentCards(currentCards.filter(card => false));
      service.postUserLeaderboard(lib.getNickname(), level.level._id, lib.getScore());
      localStorage.setItem('levelNumber', '3');
      if(card13Played) localStorage.setItem('feedback', "Schade! Sie hätten nicht auf den Sicherheitspatch warten sollen, sondern andere Maßnahmen ergreifen sollen. Da Sie dies nicht getan haben, haben Hacker in der Zwischenzeit die Schwachstelle des Patches ausgenutzt und haben nun die Kontrolle über das ICS-System!");
      else localStorage.setItem('feedback', "Gratulation! Sie haben nun den Vorgang der Installation von Patches erfolgreich gemeistert! Behalten Sie im Hinterkopf, regelmäßig nach Sicherheitspatches Ausschau zu halten. Beachten Sie ebenfalls, dass nicht immer Sicherheitspatches für ICS-Geräte verfügbar sind oder eine Installation oft nicht möglich ist. In solchen Fällen sollte immer eine Risikoanalyse mit alternativen Ausgleichsmaßnahmen wie die im Beispiel erfolgte Netzsegmentierung erfolgen. Machen Sie es Hackern nicht durch veraltete Systeme einfach!");
      navigate('../levelcompletion');
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

export default Level3;