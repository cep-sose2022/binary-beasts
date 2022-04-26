import React from "react";
import { useNavigate } from "react-router-dom";

function LevelOverview() {
    let navigate = useNavigate();


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