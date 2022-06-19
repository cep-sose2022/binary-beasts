import React from 'react';
import Navbar from "../../Navbar";
import Footer from "./Footer";

function FAQ(){
    return(
        <>
        <Navbar />
        <div id="help-container" name="help-container">
        <div className="subpagescontent">
            <h1>FAQ</h1>
            <h2>Spiel</h2>
            <h3>Wie funktioniert es?</h3>
                <p>
                    Einfach einen Benutzernamen angeben (aber nicht den echten Namen!) und auf "Spielen" klicken.
                </p>
            <h3>Kann ich ein Level wiederholen?</h3>
                <p>Ja, es wird nur die bessere Punktzahl gespeichert.</p>
            <h3>Kann man den Verlauf eines Levels sehen?</h3>
                <p>Ja. Am Ende des Levels gibt es die Möglichkeit über "Gespielte Karten" Feedback über seine Entscheidungen zu erhalten.</p>
            <h3>Kann man ein Level pausieren?</h3>
                <p>Nein.</p>
            <h2>Einstellungen</h2>
            <h3>Wie kann ich die Farbe anpassen?</h3>
                <p>Gar nicht.</p>
            <h3>Kann ich meinen Benutzernamen nachträglich ändern?</h3>
                <p>Nein.</p>
            <h2>Benutzerprofil</h2>
            <h3>Wer kann meinen Spielstand sehen?</h3>
                <p> Die individuellen Punkte pro Level sehen nur Sie. Und wir vielleicht.</p>
            <h3>Wer sieht meine Punkte?</h3>
                <p>Jeder, auf dem Leaderboard.</p>
        </div>
        </div>
        <Footer />
        </>
    );
}

export default FAQ;