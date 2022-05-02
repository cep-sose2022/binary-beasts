import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Homepage from "./Pages/Homepage";
import Leaderboard from './Pages/Leaderboard';
import LevelOverview from './Pages/LevelOverview';
import Progress from "./Pages/Progresspage";
import Game from "./Pages/Game";
import logo from "./images/logobb.png";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <div className="logo"><img src={logo} alt="not found"></img></div>
        {/* <div class="background"><img src={background} alt="not found"></img></div> */}
        <div className ="navlinks">
          <li><NavLink activeclassname="active" to="/"> Home </NavLink></li>
          <li><NavLink activeclassname="active" to="/leveloverview"> Levels </NavLink></li>
          <li><NavLink activeclassname="active" to="/progress"> Fortschritt </NavLink></li>
          <li><NavLink activeclassname="active" to="/leaderboard"> Leaderboard </NavLink></li>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/progress" element={<Progress />}/>
        <Route path="/leaderboard" element={<Leaderboard />}/>
        <Route path="/leveloverview" element={<LevelOverview />}/>
        <Route path="/game" element={<Game />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;