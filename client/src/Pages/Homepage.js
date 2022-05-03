import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../images/logo_binary_beasts.png";
import '../App.css';
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

    return(
        <div id="home-container" name="home-container">
            {/* <h1>Home Page</h1> */}
            <div id="home-info" name="home-info">

                <h1>Willkommen bei Binary Beasts</h1>
                <image src={logo}></image>
                <p id="introduction" name="introduction">Kurze Einleitung</p>
            </div>

            <div id="user-login" name="user-login">
                <label for="nickname">Nickname:</label>

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
}

export default Home;