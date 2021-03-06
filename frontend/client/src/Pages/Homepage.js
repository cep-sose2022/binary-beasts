import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
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
      if (newUserCreated.newUser !== undefined) {
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
      <Navbar />
      <div id="homebackground">
      <div id="home-container" className="container">
        <div id="blog">
          <div id="home-info">
            <h1>Be-Aware</h1>
            <p>Willkommen zum OT-Security-Awareness Training von Binary Beasts!<br />
              Hier lernen Sie auf eine spannende und spielerische Weise die Wichtigkeit
              von OT-Security und wie man diese sicherstellt. <br />
              Wir wünschen Ihnen viel Spaß!</p>
          </div>

          <div id="accountgrid">
            <div id="account" className="box2">
            {!loggedIn ? <p>Wenn Sie noch nicht registriert sind, können Sie Ihren gewünschten Nicknamen und einen Pin in die Login-Maske eingeben:</p> : <p></p>}
              {
                localStorage.getItem("username") === null && // hide login-form when logged in
                <div id="user-login">
                  <input id="nickname" placeholder="Nickname" type="text" ref={nameInputField} />
                  <input id="pin" placeholder="Pin" type="password" ref={pinInputField} />
                    
                  <button id="loginbutton" onClick={() => {checkInput()}}>Login</button>
                </div>
              }

              <div id="login-message">
                {inputMessage === 1 ? <p>Neuer User mit dem Nicknamen "{lib.getNickname()}" wurde erstellt.</p> : //return the fitting feedback for inputField
                  (inputMessage === 2 ? <p>Bitte füllen Sie beide Felder aus!</p> :
                    (inputMessage === 3 ? <p>Es existiert bereits ein User mit diesem Nicknamen.</p> : 
                    (loggedIn ? <p>Willkommen {lib.getNickname()}</p> : <p></p>)))
                }
              </div>
              {loggedIn &&
                <button id="logoutbutton" onClick={() => { localStorage.removeItem("username"); setLoggedIn(false); }}>Log Out</button>
              }
            </div>
          </div>

          <div id="how-to-play-grid">
            <div id="how-to-play">
              <h3>Spielanleitung</h3>
              <p>Es gibt unterschiedliche Szenarien, die Sie durchlaufen werden.
                Sie haben dabei freie Wahl, welches Sie wählen, aber wenn Sie eins begonnen haben,
                müssen Sie es erst zu Ende spielen, bevor Sie andere spielen können. <br />
                In jedem Szenario kommen Ereignisse auf die Sie reagieren müssen, indem Sie Karten ausspielen.
                Dabei müssen Sie beachten, dass Sie jede Karte nur einmal benutzen können.
                Haben Sie sich entschieden wie Sie auf das Ereignis reagieren und eine Karte gewählt, folgt das nächste Ereignis mit neuen Karten.
                Bei manchen Szenarien bleiben die alten Karten erhalten, aber darauf sollten Sie sich nicht verlassen. <br />
                Jede Karte gibt unterschiedlich viele Punkte, das Ziel ist es kluge Entscheidungen zu treffen um eine möglichst hohe Punktzahl zu erreichen.
                Sie können ein Szenario mehrmals spielen und sich dadurch verbessern.
              </p>
            </div>
          </div>

          <div id="play">
            <button id="playbutton" onClick={() => { checkInput() }}>
            <>Spielen</>
          </button>
          </div>

        </div>
        
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;