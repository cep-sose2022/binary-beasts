
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import lib from "../library/bib.js";
import Navbar from "../Navbar";
import service from "../service";
import Footer from "./subpages/Footer";

function Home(props) {
  let navigate = useNavigate();
  let nameInputField = React.createRef(); // for referencing inputField and setting name on button click
  let pinInputField = React.createRef();
  const [instructionsOpen, setInstructionsOpen] = useState(false); //for showing "Spielanleitung"
  const [inputMessage, setInputMessage] = useState(0); //for omitting swapping between users

  function checkInput() {
    //console.log(lib.getNickname());
    if (nameInputField.current.value != "") { //input cannot be empty
      console.log(service.checkUser(nameInputField.current.value, pinInputField.current.value))
      if (service.checkUser(nameInputField.current.value, pinInputField.current.value)) { // validate user login
        lib.setNickname(nameInputField.current.value);
        
        navigate("/leveloverview");
      }
      else {
        service.postUser(nameInputField.current.value, pinInputField.current.value);
        lib.setNickname(nameInputField.current.value);
        setInputMessage(1);
      }
    }
    else 
      setInputMessage(2); 

  }

  return (
    <>
    <Navbar />
    <div id="home-container" className="container">
      <div id="home-info" className="box">
        <h1>Willkommen bei Binary Beasts</h1>
        <p id="introduction">Kurze Einleitung</p>
      </div>

      <div id="user-login" className="box">
        <label for="nickname">Nickname:</label>

        <input id="nickname" type="text" ref={nameInputField} /><br />
        <br />
        <label for="pin">Pin:</label>

        <input id="pin" type="text" ref={pinInputField} /><br />
      </div>

      <div id="login-message" className="box">
        {inputMessage === 1 ? <p>Neuer User mit dem Nicknamen "{lib.getNickname()}" wurde erstellt.</p> : //return the fitting feedback for inputField
          (inputMessage === 2 ? <p>Sie müssen einen Namen angeben.</p>:<p>Willkommen</p>)
        }
      </div>

      <div id="play"><button id="playbutton" onClick={() => { checkInput() }}
      >Spielen
      </button></div>

      <button id="instructionbutton"
        onClick={() => { instructionsOpen ? setInstructionsOpen(false) : setInstructionsOpen(true) }} /* toggle button for how-to-play*/
      >Spielanleitung
      </button>
      <div id="description">
        {instructionsOpen &&
          <div id="how-to-play" className="box">
            <h3>Spielanleitung</h3>
            <p>Es gibt unterschiedliche Szenarien, die Sie durchlaufen werden.
              Sie haben dabei freie Wahl, welches Sie wählen, aber wenn Sie eins begonnen haben,
              müssen Sie es erst zu Ende spielen, bevor Sie andere spielen können.
              In jedem Szenario kommen Ereignisse auf die reagieren müssen, indem Sie Karten ausspielen.
              Dabei müssen Sie beachten, dass Sie jede Karte nur einmal benutzen können.
              Haben Sie sich entschieden wie Sie auf das Ereignis reagieren und eine Karte gewählt, folgt das nächste Ereignis mit neuen Karten.
              Bei manchen Szenarien bleiben die alten Karten erhalten, aber darauf sollten Sie sich nicht verlassen.
            </p>
          </div>
        }
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Home;