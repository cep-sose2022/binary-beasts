import React from "react";
import service from './../service';
import useLocation from "react-router-dom";
import useNavigate from "react-router-dom";
import Navbar from "../Navbar";
import pdfDocs from '../library/pdfDocs';
import downloadIcon from '../images/download.png';

const levels = service.getAllLevels();


function Leveldescription() {
    let navigate = useNavigate();
    let location = useLocation();
  
    const levelNumber = location.state.levelid;
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
          <button onClick={() => {
            navigate("../leveloverview");
          }}>Zurück</button>
          <a id="pdfdownload" download={"Lerninhalt-" + level[0].name + ".pdf"} href={pdfDocs.getPdfDoc(level[0].token)}>Lerninhalt <img src={downloadIcon} /> </a>  
          <button onClick={() => {
            navigate("../game", {
              state: {
                levelid: levelNumber
              }
            });
          }}>Starten</button>
          
      </div>
      </div>
      </div>
      </>
    );
}

export default Leveldescription;