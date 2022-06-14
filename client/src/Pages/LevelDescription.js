import React from "react";
import service from './../service';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import Navbar from "../Navbar";
import pdfDocs from '../library/pdfDocs';
import downloadIcon from '../images/download.png';
import {motion} from "framer-motion";

const levels = service.getAllLevels();


function Leveldescription() {
    let navigate = useNavigate();
    let location = useLocation();

    let levelId;
    React.useEffect(() => {
        if (!location.state) {
            navigate('../')
        } else {
            levelId = service.getLevel("level" + location.state.levelid);
        }
    }, []);

    if(!location.state) return <Navigate replace to="/" />

    const levelNumber = location.state.levelid;
    const level = levels.allLevels.filter(level => level.token === "level" + levelNumber);
    return(
      <>
      <Navbar />
      <div id="description-container" className="container">
          <motion.div className="box"
               initial={{ opacity: 0, translateX: 100, translateY: -100 }}
               animate={{ opacity: 1, translateX: 0, translateY: 0 }}
               transition={{ duration: 1.1 }}>
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
      </motion.div>
      </div>
      </>
    );
}

export default Leveldescription;