import { useNavigate } from "react-router-dom";
import service from "./../service";

function LevelOverview() {
    let navigate = useNavigate();

    // test for service
    console.log(service.getLevel('level1'));

    return(
        <div id="level-overview-container">
            <h1> Level-Übersicht</h1>
            <ol>
                <li>
                    <button id="levelButton1" className="levelButton"onClick={() => {
                        navigate("/game", {
                        state: {
                          levelid: 1
                        }
                    });
                    }}>1
                    </button>
                </li>
                <li>
                    <button id="levelButton2" className="levelButton" onClick={() => {
                        navigate("/game", {
                        state: {
                          levelid: 2
                        }
                    });
                    }}>2
                    </button>
                </li>
            </ol>
        </div>
    );
}

export default LevelOverview;