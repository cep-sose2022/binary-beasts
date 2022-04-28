import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Homepage from "./Pages/Homepage";
import Leaderboard from './Pages/Leaderboard';
import LevelOverview from './Pages/LevelOverview';
import Progress from "./Pages/Progresspage";
import Game from "./Pages/Game";
import logo from "./images/logobb.png";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <div class="logo"><img src={logo} alt="not found"></img></div>
        {/* <div class="background"><img src={background} alt="not found"></img></div> */}
        <div class ="navlinks">
          <li><Link to="/"> Home </Link></li>
          <li><Link to="/progress"> Fortschritt </Link></li>
          <li><Link to="/leaderboard"> Leaderboard </Link></li>
          <li><Link to="/leveloverview"> Levels </Link></li>
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