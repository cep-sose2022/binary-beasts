import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import service from './../service';

function LevelOverview() {

  let navigate = useNavigate();

  const levels = service.getAllLevels().allLevels;

  return (
    <>
      <Navbar />
      <div id="level-overview-container">
        <div id="playfield">

          <button id="levelButton1" className="levelButton" onClick={() => {
            navigate("/description", {
              state: {
                levelid: 1
              }
            });
          }}>
            1
            <div className="boxDescriptionButton"><span>{levels.filter(level => level.token === "level" + 1)[0].name}</span></div>
          </button>

          <button id="levelButton2" className="levelButton" onClick={() => {
            navigate("/description", {
              state: {
                levelid: 2
              }
            });
          }}>2
            <div className="boxDescriptionButton"><span>{levels.filter(level => level.token === "level" + 2)[0].name}</span></div>
          </button>

          <button id="levelButton3" className="levelButton" onClick={() => {
            navigate("/description", {
              state: {
                levelid: 3
              }
            });
          }}>3
            <div className="boxDescriptionButton"><span>{levels.filter(level => level.token === "level" + 3)[0].name}</span></div>
          </button>

          <button id="levelButton4" className="levelButton" onClick={() => {
            navigate("/description", {
              state: {
                levelid: 4
              }
            });
          }}>4
            <div className="boxDescriptionButton"><span>{levels.filter(level => level.token === "level" + 4)[0].name}</span></div>
          </button>

          <button id="levelButton5" className="levelButton" onClick={() => {
            navigate("/description", {
              state: {
                levelid: 5
              }
            });
          }}>5
            <div className="boxDescriptionButton"><span>{levels.filter(level => level.token === "level" + 5)[0].name}</span></div>
          </button>

           <button id="levelButton6" className="levelButton" onClick={() => {
            navigate("/description", {
              state: {
                levelid: 6
              }
            });
          }}>6
            <div className="boxDescriptionButton"><span>{levels.filter(level => level.token === "level" + 6)[0].name}</span></div>
          </button>
          
          <button id="levelButton7" className="levelButton" onClick={() => {
            navigate("/description", {
              state: {
                levelid: 7
              }
            });
          }}>7
            <div className="boxDescriptionButton"><span>{levels.filter(level => level.token === "level" + 7)[0].name}</span></div>
          </button>

          <button id="levelButton8" className="levelButton" onClick={() => {
            navigate("/description", {
              state: {
                levelid: 8
              }
            });
          }}>8
            <div className="boxDescriptionButton"><span>{levels.filter(level => level.token === "level" + 8)[0].name}</span></div>
          </button>

          {/*<button id="levelButton9" className="levelButton" onClick={() => {
            navigate("/description", {
              state: {
                levelid: 9
              }
            });
          }}>9
            <div className="boxDescriptionButton"><span>{levels.filter(level => level.token === "level" + 9)[0].name}</span></div>
          </button>

          <button id="levelButton10" className="levelButton" onClick={() => {
            navigate("/description", {
              state: {
                levelid: 10
              }
            });
          }}>10
            <div className="boxDescriptionButton"><span>{levels.filter(level => level.token === "level" + 10)[0].name}</span></div>
          </button> */}

        </div>
      </div>
    </>
  );
}

export default LevelOverview;