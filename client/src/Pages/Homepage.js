import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../images/logo_binary_beasts.png";



function Home(props) {
    let navigate = useNavigate();
    const [instructionsOpen, setInstructionsOpen] = useState(false); //for showing "Spielanleitung"

    return(
        <div id="home-container" name="home-container">
            <h1>Home Page</h1>
            <div id="home-info" name="home-info">
                <h1>Name der Software</h1>
                <image src={logo}></image>
                <p id="introduction" name="introduction">Kurze Einleitung</p>
            </div>

            <div id="user-login" name="user-login">
                <label for="nickname">Nickname:</label>
                <input id="nickname" name="nickname" type="text"></input>
                <button onClick={()=> navigate("/leveloverview")}
                    >Spielen!
                </button>
            </div>
            <div id="description" name="description">
                <button id="instruction" name="instruction" 
                onClick={()=> {instructionsOpen ? setInstructionsOpen(false) : setInstructionsOpen(true)}} /* toggle button for how-to-play*/
                  >Spielanleitung
                </button>
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
    );
}

export default Home;