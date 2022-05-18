import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function LevelOverview() {

    let navigate = useNavigate();

    return(
        <>
        <Navbar />
        <div id="level-overview-container">
            <div id="playfield">
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
                    <button id="levelButton3" className="levelButton" onClick={() => {
                        navigate("/game", {
                        state: {
                          levelid: 3
                        }
                    });
                    }}>3
                    </button>
                    <button id="levelButton4" className="levelButton" onClick={() => {
                        navigate("/game", {
                        state: {
                          levelid: 4
                        }
                    });
                    }}>4
                    </button>
                    <button id="levelButton5" className="levelButton" onClick={() => {
                        navigate("/game", {
                        state: {
                          levelid: 5
                        }
                    });
                    }}>5
                    </button>
                    {/* <button className="levelButton" onClick={() => {
                        navigate("/game", {
                        state: {
                          levelid: 6
                        }
                    });
                    }}>6
                    </button>
                    <button className="levelButton" onClick={() => {
                        navigate("/game", {
                        state: {
                          levelid: 7
                        }
                    });
                    }}>7
                    </button> */}
            </div>
        </div>
        </>
    );
}

export default LevelOverview;