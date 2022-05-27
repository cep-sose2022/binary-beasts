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

          {/* <button className="levelButton" onClick={() => {
                        navigate("/description", {
                        state: {
                          levelid: 6
                        }
                    });
                    }}>6
                    </button>
                    <button className="levelButton" onClick={() => {
                        navigate("/description", {
                        state: {
                          levelid: 7
                        }
                    });
                    }}>7
                    </button> */}
        </div>
      </div>
    </>
  );
}

export default LevelOverview;