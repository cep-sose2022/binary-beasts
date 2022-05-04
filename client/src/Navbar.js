import React from "react";
import { NavLink} from 'react-router-dom';
import logo from "./images/logobb.png";

function Navbar() {
    return(
        <nav>
        <div className="logo"><img src={logo} alt="not found"></img></div>
        {/* <div class="background"><img src={background} alt="not found"></img></div> */}
        <div class ="navlinks">
          <NavLink activeClassName="active" to="/"> Home </NavLink>
          <NavLink activeClassName="active" to="/leveloverview"> Levels </NavLink>
          <NavLink activeClassName="active" to="/progress"> Fortschritt </NavLink>
          <NavLink activeClassName="active" to="/leaderboard"> Leaderboard </NavLink>
        </div>
      </nav>
    );
}

export default Navbar;