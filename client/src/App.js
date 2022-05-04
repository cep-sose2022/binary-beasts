import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from "./Pages/Homepage";
import Leaderboard from './Pages/Leaderboard';
import LevelOverview from './Pages/LevelOverview';
import Progress from "./Pages/Progresspage";
import Game from "./Pages/Game";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      
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