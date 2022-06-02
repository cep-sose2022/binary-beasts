import React from "react";
import Navbar from "../../Navbar";
import Footer from "./../subpages/Footer";

function AboutUs(){
    return(
        <>
        <Navbar />
        <div id="about-us-container" name="about-us-container">
            <div className="subpagescontent">
            <h1>Über uns</h1>
            <h2>Wer wir sind</h2>
            <p>
                Binary Beasts ist ein Team, bestehend aus Studierenden der Hochschule Mannheim, 
                welches das Ziel hat in der Industriebranche mehr Aufmerksamkeit auf Cyber Security relevante Themen zu lenken.
                In der Industrie 4.0 wird man früher oder später darauf stoßen, weil es einen immer größeren Anteil einnimmt. 
                Wir möchten vermeiden, dass Unternehmen Opfer von Cyber Angriffen werden, 
                indem wir mit dieser Webanwendung präventiv darauf aufmerksam machen wo welche Schwachstellen liegen und wie man sie beheben kann.
            </p>
            <h3>Kontakt</h3>
            <p>binarybeasts100@gmail.com</p>
        </div>
        </div>
        <Footer />
        </>
    );
}

export default AboutUs;