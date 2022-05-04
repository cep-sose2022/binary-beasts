import React, {useState} from "react";
import mail from './../../images/level1/mail.jpg';
import login from './../../images/level1/login.jpg';
import download from './../../images/level1/download.jpg';
import service from './../../service';

function Level1() {
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
        if (cardOption.nextImage === 'mail') {
            setCurrentImage(mail);
        } else if (cardOption.nextImage === 'login') {
            setCurrentImage(login);
        } else if (cardOption.nextImage === 'download') {
            setCurrentImage(download);
        } else if ((cardOption.name === 'card1' || (cardOption.name === 'card3'))) {
            setEventTextNumber(2);
        } else if (cardOption.name === 'card2') {
            setEventTextNumber(0);
        } else if (cardOption.name === 'card4') {
            setEventTextNumber(1);
        } else if ((cardOption.name === 'card5' || (cardOption.name === 'card6'))) {
            setEventTextNumber(2);
        }
    }

    return (
        <div className='app'>
            ) : (
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