import { useNavigate } from "react-router-dom";
import levelbg from "../images/leveloverviewbackground1.png";

function LevelOverview() {

    let navigate = useNavigate();

    return(
        <div id="level-overview-container">
            <div id="playfield">
                    {/* <img id="levelbg" src={levelbg}></img> */}
                    <button id="levelButton1" className="levelButton"onClick={() => {
                        navigate("/game", {
                        state: {
                          levelid: 1
                        }
                    });
                    }}>1
                    </button>
                    <button id="levelButton2" className="levelButton" onClick={() => {
                        navigate("/game", {
                        state: {
                          levelid: 2
                        }
                    });
                    }}>2
                    </button>
            </div>
        </div>
    );
}

export default LevelOverview;