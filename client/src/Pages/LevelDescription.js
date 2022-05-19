import React from "react";
import service from './../service';
import { useLocation, useNavigate } from "react-router-dom";

function Leveldescription() {
    let navigate = useNavigate();
    let location = useLocation();
  
    const levelNumber = location.state.levelid;
    const levels = service.getAllLevels();
    const level = levels.allLevels.filter(level => level.token === "level" + levelNumber);
    return(
      <div>
          <h1>{level[0].name}</h1>
          <p>{level[0].description}</p>
          <button onClick={() => {
            navigate("/game", {
              state: {
                levelid: levelNumber
              }
            });
          }}>Starten</button>
          <button onClick={() => {
            navigate("/leveloverview");
          }}>Zurück</button>
      </div>
      
    );
}

export default Leveldescription;