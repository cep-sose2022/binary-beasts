import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Homepage from "./Pages/Homepage";
import Leaderboard from './Pages/Leaderboard';
import LevelOverview from './Pages/LevelOverview';
import Progress from "./Pages/Progresspage";
import Game from "./Pages/Game";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/progress"> Fortschritt </Link>
        <Link to="/leaderboard"> Leaderboard </Link>
        <Link to="/leveloverview"> Levels </Link>
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
