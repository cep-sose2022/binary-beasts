import React, {useState} from "react";
import service from './../../service';
import {useNavigate} from 'react-router-dom';
import "../../index.css";

function Level3() {
    let navigate = useNavigate();
    const level = service.getLevel('level3');
    const [currentEvent, setCurrentEvent] = useState(1);

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
    const [gameOver, setGameOver] = useState(false);

    React.useEffect(() => {
      //setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
      if(currentEvent == 3 && patchDocumented) {
        setCurrentCards(level.level.events[currentEvent - 1].cards.filter(card => card.name != 'card10'));
      } else {
        setCurrentCards(level.level.events[currentEvent - 1].cards);
      }
    }, [currentEvent]);

    React.useEffect(() => {  
      if(usbInfected && cardSevenPlayed) {
        setEventText(level.level.events[currentEvent - 1].text[4]);
        setCardSevenPlayed(false)
        setUsbInfected(false);
      } else if(!compatibilityChecked && usbInfected && dataSaved && currentEvent == 3 ) {
        setEventText(level.level.events[currentEvent - 1].text[9]);
        setCombatibilityChecked(true);
      } else if(!compatibilityChecked && usbInfected && currentEvent == 3 ) {
        setEventText(level.level.events[currentEvent - 1].text[3]);
        setCombatibilityChecked(true);
      } else if(!compatibilityChecked && dataSaved && currentEvent == 3 ) {
        setEventText(level.level.events[currentEvent - 1].text[10]);
        setCombatibilityChecked(true);
      }else if(usbInfected && currentEvent == 3)  {
        setEventText(level.level.events[currentEvent - 1].text[1]);
        setUsbInfected(false);
      } else if(!compatibilityChecked && currentEvent == 3 ) {
        setEventText(level.level.events[currentEvent - 1].text[2]);
        setCombatibilityChecked(true);
      } else if(cardElevenPlayed && !patchDocumented ) {
        setEventText(level.level.events[currentEvent - 1].text[6]);
        setCardElevenPlayed(false);
      } else {
        setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
        setCardSevenPlayed(false);
      } 

      if(gameOver) {
        setCurrentCards(currentCards.filter(card => false));
      }
    }, [eventTextNumber, currentEvent]);

    const handleAnswerButtonClick = (cardOption) => {
        setCurrentEvent(cardOption.nextEvent);
        setEventTextNumber(cardOption.nextEventText);
        setCurrentCards(currentCards.filter(card => card.name != cardOption.name));

        if(cardOption.name == 'card4') {
          setCombatibilityChecked(true);
        }

        if(cardOption.name == 'card6') {
          setUsbInfected(true);
        }
          
        if(cardOption.name == 'card7') {
          setCardSevenPlayed(true);
        }

        if(cardOption.name == 'card8') {
          setDataSaved(true);
        }

        if(cardOption.name == 'card9') {
          setPatchDocumented(true);
        }

        if(cardOption.name == 'card11') {
          setCardElevenPlayed(true);
        }

        if(cardOption.name == 'card12' || cardOption.name == 'card13') {
          setGameOver(true);
        }

    }

    const eventTextSplit = () => {
      //Bei jedem '<' im eventText wird ein br-Tag eingebaut
      const wrapped = eventText.split('<').reduce((prev, cur) => [ ...prev, cur, <br /> ], [])
      return wrapped;
    };

    return (
      <div className='app'>
      <>
          
      <nav className="gameNavbar">
      {/* <div class="background"><img src={background} alt="not found"></img></div> */}
      <div id="navlevelround"className="navgamecontent">
          <p>Level: <span>1</span> </p>
          <p>Round: <span>1</span> </p>
      </div>
      <div className="navgamecontent">
          <p>Time: <span>00:00</span> </p>
      </div>
      <div id="score" className="navgamecontent">
          <p>Score: <span>40</span></p>
      </div>
      
  </nav>
  <div className="gamecontainer">
      <div id="game">
          <div id="event">
              <div id="eventmessagecontainer">
                      <div id="eventmessage">
                      <div className='event-text'>{!eventText ? "Loading..." : eventTextSplit()}</div>
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

export default Level3;