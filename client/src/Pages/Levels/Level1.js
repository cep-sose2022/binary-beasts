import React, {useState} from "react";
import mail from './../../images/level1/mail.jpg';
import login from './../../images/level1/login.jpg';
import download from './../../images/level1/download.jpg';
import service from './../../service';
import {useNavigate} from 'react-router-dom';

function Level1() {
    let navigate = useNavigate();
    const level = service.getLevel('level1');
    const [currentEvent, setCurrentEvent] = useState(1);

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
        if (cardOption.nextImage === 'mail') {
            setCurrentImage(mail);
        } else if (cardOption.nextImage === 'login') {
            setCurrentImage(login);
        } else if (cardOption.nextImage === 'download') {
            setCurrentImage(download);
        } else if (cardOption.nextEvent === 0) {
            navigate('./../LevelOverview');
        }
    }

    return (
        <div className='app'>
            <>
                <div className='images'>
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
                </div>
            </>
        </div>
    );
}

export default Level1;