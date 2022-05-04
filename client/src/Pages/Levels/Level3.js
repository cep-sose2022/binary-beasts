import React, {useState} from "react";
import "../../index.css";

function Level3() {
  const [data, setData] = React.useState(null);
  const [eventText, setEventText] = useState(null);
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(1);
  //const [currentImage, setCurrentImage] = useState(mail);

  const handleAnswerButtonClick = (cardOption) => {
    /* if (cardOption.nextEvent === 0){
      setShowScore(true);

    };
    setCurrentEvent(cardOption.nextEvent);
    setScore(score + cardOption.points);
    if ( cardOption.nextImage === 'mail' ){
      setCurrentImage(mail);
    }
    else if (cardOption.nextImage === 'login'){
      setCurrentImage(login);
    }
    else if (cardOption.nextImage === 'download'){
      setCurrentImage(download);
    } */
  }

  return (
      <div className='app'>
        {showScore ? (
            <div className='score-section'>
              Score: {score}
            </div>
        ) : (
            <>
              <div className='answers'>
                <div className='images'>
                  <img className='img'/>
                </div>
                <div className='cards'>
                  {!data ? "Loading..." :data.map((cardOption) => (
                      <button onClick={()=> handleAnswerButtonClick(cardOption)}>{cardOption.text}</button>
                  ))}
                </div>
              </div>
              <div className='questions'>
                <br/><div className='event-text'>{!eventText ? "Loading..." :eventText}</div>
              </div>
            </>
        )}
      </div>
  );
}

export default Level3;