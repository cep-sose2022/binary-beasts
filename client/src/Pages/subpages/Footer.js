import React from "react";
import { Link, NavLink } from "react-router-dom";

function Footer(props) {
    return (
        <footer>
            <ul id="info-links" name="info-links">
                <p>&copy; Copyright 2022 Binary Beasts</p>
                <li><NavLink activeclassname="active" to="/aboutus">Über uns</NavLink></li>
                <li><NavLink activeclassname="active" to="/faq">FAQ</NavLink></li>
                <li><NavLink activeclassname="active" to="/privacy_policy">Impressum &amp; Datenschutz</NavLink></li>
            </ul>
        </footer>
    );

}

export default Footer;