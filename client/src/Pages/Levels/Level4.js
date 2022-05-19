import React from "react";
import service from "../../service";

function Level4() {

    function Level1() {
        let navigate = useNavigate();
        const level = service.getLevel('level4');
        const [currentEvent, setCurrentEvent] = useState(1);

        let currentCards = level.level.events[0].cards;
        let eventText =  level.level.events[0].text[0];
        let eventTextNumber = 0;

        React.useEffect(() => {
            setEventText(level.level.events[currentEvent - 1].text[eventTextNumber]);
            setCurrentCards(level.level.events[currentEvent - 1].cards);
        }, [currentEvent]);

        const handleAnswerButtonClick = (cardOption) => {
            setCurrentEvent(cardOption.nextEvent);
            setEventTextNumber(cardOption.nextEventText);
            setCurrentRound(currentRound + 1);
            lib.updateScore(cardOption.points);
            
        }

        const endGame = () =>{
            const dif = lib.getScore() - startScore;
                service.postUserLeaderboard(lib.getNickname(), level.level._id, dif);
                navigate('./../LevelOverview');
        }

        return (
            <div className='app'>
                <>

                    <div id="gamecontainer" className="container">
                        <div id="game">
                            <div id="event">
                                <div id="eventmessagecontainer">
                                    <div id="eventmessage">
                                        <div id='event-text'>{!eventText ? "Loading..." : eventText}</div>
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
                </>
            </div>
        );
    }
}
    export default Level4;
