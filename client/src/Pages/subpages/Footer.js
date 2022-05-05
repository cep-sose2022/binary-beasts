import React from "react";
import { Link, NavLink } from "react-router-dom";

function Footer(props) {
    return (
        <footer>
            <ul id="info-links" name="info-links">
                <p>&copy; 2022 Binary Beasts. All rights reserved.</p>
                <li><NavLink activeclassname="active" to="/aboutus">Über uns</NavLink></li>
                <li><NavLink activeclassname="active" to="/faq">FAQ</NavLink></li>
                <li><NavLink activeclassname="active" to="/privacy_policy">Impressum &amp; Datenschutz</NavLink></li>
            </ul>
        </footer>
    );

}

export default Footer;