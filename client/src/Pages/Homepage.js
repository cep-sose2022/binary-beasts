import React from "react";
import {useNavigate} from "react-router-dom";
import logo from "../images/logo_binary_beasts.png";

function Home(props) {
    let navigate = useNavigate();

    return(
        <div id="home" name="home">
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
        </div>
    );
}

export default Home;