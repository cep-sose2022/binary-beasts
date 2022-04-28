import { useNavigate } from "react-router-dom";
import service from "./../service";

function LevelOverview() {
    let navigate = useNavigate();

    // test for service
    const levels = service.getAllLevels();
    console.log('levels.....', levels);
    const events = service.getEvent(levels[0]);
    console.log('events.....', events);
    const cards = service.getEventCard(events[0]);
    console.log('cards.....', cards);
    const card = service.getCard(cards[0]);
    console.log('card.....', card);




    return(
        <div>
            <h1>Level-Übersicht</h1>
            <ol>
                <li>
                    <button onClick={() => {
                        navigate("/game", {
                        state: {
                          levelid: 1
                        }
                    });
                    }}>Level 1
                    </button>
                </li>
                <li>
                    <button onClick={() => {
                        navigate("/game", {
                        state: {
                          levelid: 2
                        }
                    });
                    }}>Level 2
                    </button>
                </li>
            </ol>
        </div>
    );
}

export default LevelOverview;