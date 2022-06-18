import React from "react";
import Navbar from "../../Navbar";
import Footer from "./../subpages/Footer";

function PrivacyPolicy() {
    return (
        <>
        <Navbar />
        <div id="policy-container" name="policy-container">
        <div className="subpagescontent">
            <h1>Impressum</h1>
            <p>
                Binary Beasts <br />
                Speyerer Straße 2 <br />
                68163 Mannheim
                binarybeasts100@gmail.com
            </p>
            <hr />
            <h2>Rechtliche Hinweise</h2>
            <p>
                Diese Website verwendet eine MIT-Lizenz:
            </p>
            <p>
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
                <br />
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
                <br />
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
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
        </div>
        <Footer />
        </>
    );
}

export default PrivacyPolicy;