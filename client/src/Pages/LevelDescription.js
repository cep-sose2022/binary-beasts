import React from "react";
import service from './../service';
import { useLocation, useNavigate } from "react-router-dom";
const levels = service.getAllLevels();

function Leveldescription() {
    let navigate = useNavigate();
    let location = useLocation();
  
    const levelNumber = location.state.levelid;
    const level = levels.allLevels.filter(level => level.token === "level" + levelNumber);
    return(
      <div id="description-container" className="container">
          <h1>{level[0].name}</h1>
          
          <div id="level-description" className="box">
            <p>{level[0].description}</p>
          </div>

          <button id="levelOverview-button" onClick={() => {
            navigate("../game", {
              state: {
                levelid: levelNumber
              }
            });
          }}>Starten</button>
          <button id="levelOverview-button" onClick={() => {
            navigate("../leveloverview");
          }}>Zurück</button>
      </div>
      
    );
}

export default Leveldescription;