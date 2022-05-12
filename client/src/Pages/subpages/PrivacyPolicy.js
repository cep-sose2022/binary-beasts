import React from "react";

function PrivacyPolicy(){
    return(
        <div id="policy-container" name="policy-container">
            <h1>Impressum</h1>
                <p>
                    Binary Beasts <br/> 
                    Speyerer Straße 2 <br/>
                    68163 Mannheim
                    binarybeasts100@gmail.com
                </p>
            <hr/>
            <h2>Rechtliche Hinweise</h2>
            <p>
                Die Inhalte dieser Website sind geschützt und nur für Personen mit der erteilten Berechtigung zugänglich.
                Es ist untersagt jegliche Inhalte zu vervielfältigen oder nicht authorisierten Personen zugänglich zu machen.
            </p>
            <h3>Datenschutz</h3>
                <p>
                    Die Nutzerdaten die wir speichern sind:
                    <ul>
                        <li>Nutzername</li>
                        <li>Spielfortschritt</li>
                        <li>erreichte Punkte mit dazugehörigem Level</li>
                    </ul>
                    Die Löschung von Nutzerdaten ist nur durch Kontaktaufnahme mit Binary Beasts möglich.
                </p>
                <p>
                    Um den Spielstand individuell anzuzeigen sind Speicherungen auf dem Endnutzergerät nötig, 
                    die vom Nutzer selbst gelöscht werden können. Dafür übernimmt Binary Beasts keinerlei Haftung. 
                </p>
            <h3>Urheberrecht</h3>
                <p>
                    Alle Inhalte dieser Website sind geistiges Eigentum und dürfen nicht vervielfältigt oder kopiert werden.
                </p>
        </div>
    );
}

export default PrivacyPolicy;