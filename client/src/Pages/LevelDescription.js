import React from "react";
import service from './../service';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Leveldescription() {
    let navigate = useNavigate();
    let location = useLocation();
  
    const levelNumber = location.state.levelid;
    const levels = service.getAllLevels();
    const level = levels.allLevels.filter(level => level.token === "level" + levelNumber);
    return(
      <>
      <Navbar />
      <div id="description-container" className="container">
          <div className="box">
          <h1>{level[0].name}</h1>
          
          <div id="level-description">
            <p>{level[0].description}</p>
          </div>
          <div id="levelDescriptionButtons">
          <button class="levelOverview-button" onClick={() => {
            navigate("/game", {
              state: {
                levelid: levelNumber
              }
            });
          }}>Starten</button>
          <button class="levelOverview-button" onClick={() => {
            navigate("/leveloverview");
          }}>Zurück</button>
      </div>
      </div>
      </div>
      </>
    );
}

export default Leveldescription;