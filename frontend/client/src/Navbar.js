import React from "react";
import { NavLink} from 'react-router-dom';
import logo from "./images/logobb.png";

function Navbar() {
    const loggedIn = localStorage.getItem('username') != null;
    return(
        <nav id="navmain">
        <div className="logo">
          <img src={logo} alt="not found"/>
        </div>
        <div className ="navlinks">
          <NavLink activeclassname="active" to="/"> Home </NavLink>
          {loggedIn && <NavLink activeclassname="active" to="/leveloverview"> Levels </NavLink>}
          {loggedIn && <NavLink activeclassname="active" to="/progress"> Fortschritt </NavLink>}
          <NavLink activeclassname="active" to="/leaderboard"> Leaderboard </NavLink>
        </div>
      </nav>
    );
}

export default Navbar;