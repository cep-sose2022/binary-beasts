
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
<<<<<<< HEAD
import lib from "../library/bib.js";
import Navbar from "../Navbar";
import Footer from "./subpages/Footer";

function Home(props) {
  let navigate = useNavigate();
  let nameInputField = React.createRef(); // for referencing inputField and setting name on button click
  const [instructionsOpen, setInstructionsOpen] = useState(false); //for showing "Spielanleitung"
  const [inputMessage, setInputMessage] = useState(0); //for omitting swapping between users

  function checkInput() {
    console.log(lib.getNickname());
    if (nameInputField.current.value != "") { //input cannot be empty
      if (lib.getNickname() === null || lib.getNickname() == nameInputField.current.value) { // validate user login
        lib.setNickname(nameInputField.current.value);
        navigate("/leveloverview");
      }
      else 
        setInputMessage(1); //does not allow to change users
    }
    else 
      setInputMessage(2); 
=======
import {useCookies} from "react-cookie";

import Footer from "./Footer";


function Home(props) {
  let navigate = useNavigate();
  let textInput = React.createRef(); //create a reference
  const [instructionsOpen, setInstructionsOpen] = useState(false); //for showing "Spielanleitung"
  const [nickname, setNickname] = useState();
  const [cookies, setCookie] = useCookies("user");

    function updateName(event){  // changes name to the input value
        setNickname(textInput.current.value);
        setCookie("user", textInput.current.value, {path: "/"}); //writes input into cookie
        console.log(cookies.user);
    }
>>>>>>> 1056b74 (BB-57: Create simple footer without links)

  }


  return (
    <>
    <Navbar />
    <div id="home-container" name="home-container">
      <div id="home-info" name="home-info">
        <h1>Willkommen bei Binary Beasts</h1>
        <p id="introduction" name="introduction">Kurze Einleitung</p>
      </div>

<<<<<<< HEAD
      <div id="user-login" name="user-login">
        <label for="nickname">Nickname:</label>

        <input id="nickname" name="nickname" type="text" ref={nameInputField} /><br />
      </div>

      <div id="login-message" name="login-message">
        {inputMessage === 1 ? <p>Sie sind bereits angemeldet als "{lib.getNickname()}".</p> : //return the fitting feedback for inputField
          (inputMessage === 2 ? <p>Sie müssen einen Namen angeben.</p>:<p>Willkommen</p>)
        }
      </div>

      <div id="play"><button className="playbutton" onClick={() => { checkInput() }}
      >Spielen
      </button></div>

      <button id="instructionbutton" name="instruction"
        onClick={() => { instructionsOpen ? setInstructionsOpen(false) : setInstructionsOpen(true) }} /* toggle button for how-to-play*/
      >Spielanleitung
      </button>
      <div id="description">
        {instructionsOpen &&
          <div id="how-to-play" name="how-to-play">
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
=======
                <input id="nickname" name="nickname" ref={textInput} type="text"></input><br/>
            </div>
            <div id="play"><button className="playbutton"onClick={(e)=> {updateName(e); navigate("/leveloverview")}}
                    >Spielen
            </button></div>
            
                <button id="instructionbutton" name="instruction" 
                onClick={()=> {instructionsOpen ? setInstructionsOpen(false) : setInstructionsOpen(true)}} /* toggle button for how-to-play*/
                  >Spielanleitung
                </button>
                <div id="description">
                  {instructionsOpen &&
                        <div id="how-to-play" name="how-to-play">
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
                  <Footer />
        </div>
    );
>>>>>>> 1056b74 (BB-57: Create simple footer without links)
}

export default Home;