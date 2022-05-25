
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
  let [loggedIn, setLoggedIn] = useState(lib.getNickname() != null);
  const [instructionsOpen, setInstructionsOpen] = useState(false); //for showing "Spielanleitung"
  const [inputMessage, setInputMessage] = useState(0); //for omitting swapping between users

  function checkInput() {
    if (loggedIn)
      navigate("/leveloverview");
    if ((nameInputField.current.value === "" || pinInputField.current.value === "") && !loggedIn) {
      setInputMessage(2);
    } else if (service.checkUser(nameInputField.current.value, pinInputField.current.value)) { // validate user login
      lib.setNickname(nameInputField.current.value);
      setInputMessage(4);
      setLoggedIn(true);
    } else {
      const newUserCreated = service.postUser(nameInputField.current.value, pinInputField.current.value);
      console.log(newUserCreated.newUser === undefined);
      if(newUserCreated.newUser !== undefined) {
        lib.setNickname(nameInputField.current.value);
        setInputMessage(1);
        setLoggedIn(true);
      } else {
        setInputMessage(3);
      } 
    }
  }

  return (
    <>
    <div id="homepageall">
    <Navbar />
    <div id="home-container" className="container">
      <div id="home-info" className="box">
        <h1>Willkommen bei Binary Beasts</h1>
        <p id="introduction">Willkommen zum OT-Security-Awareness Training von Binary Beasts!<br />
        Hier lernen Sie auf eine spannende und spielerische Weise die Wichtigkeit<br/ >
        von OT-Security und wie man diese sicherstellt. Wir wünschen Ihnen viel Spaß!</p>
      </div>
    {
      localStorage.getItem("username") === null && // hide login-form when logged in
      <div id="user-login" className="box">
        <label for="nickname">Nickname:</label>

        <input id="nickname" type="text" ref={nameInputField} /><br />
        <br />
        <label for="pin">Pin:</label>
        {console.log(loggedIn)}

        <input id="pin" type="password" ref={pinInputField} /><br />
      </div>
}

      <div id="login-message" className="box">
        {inputMessage === 1 ? <p>Neuer User mit dem Nicknamen "{lib.getNickname()}" wurde erstellt.</p> : //return the fitting feedback for inputField
          (inputMessage === 2 ? <p>Bitte füllen Sie beide Felder aus</p>: 
          (inputMessage === 3 ? <p>Es existiert bereits ein User mit diesem Nicknamen</p> : <p>Willkommen {lib.getNickname()}</p>))
        }
      </div>

      <div id="play"><button id="playbutton" onClick={() => { checkInput() }}>
        {loggedIn ? <>Spielen</>: <p>Login</p>}
        </button>
      </div>

      { loggedIn &&
          <button id="logout" name="logout" onClick={() => {localStorage.removeItem("username"); setLoggedIn(false);}}>Log Out</button>
        
      }

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
              müssen Sie es erst zu Ende spielen, bevor Sie andere spielen können. <br/>
              In jedem Szenario kommen Ereignisse auf die Sie reagieren müssen, indem Sie Karten ausspielen.
              Dabei müssen Sie beachten, dass Sie jede Karte nur einmal benutzen können.
              Haben Sie sich entschieden wie Sie auf das Ereignis reagieren und eine Karte gewählt, folgt das nächste Ereignis mit neuen Karten. 
              Bei manchen Szenarien bleiben die alten Karten erhalten, aber darauf sollten Sie sich nicht verlassen. <br/>
              Jede Karte gibt unterschiedlich viele Punkte, das Ziel ist es kluge Entscheidungen zu treffen um eine möglichst hohe Punktzahl zu erreichen.
              Sie können ein Szenario mehrmals spielen und sich dadurch verbessern. 
            </p>
          </div>
        }
      </div>
    </div>
    <Footer/>
    </div>
    </>
  );
}

export default Home;