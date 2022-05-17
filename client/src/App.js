import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from "./Pages/Homepage";
import Leaderboard from './Pages/Leaderboard';
import LevelOverview from './Pages/LevelOverview';
import Progress from "./Pages/Progresspage";
import Game from "./Pages/Game";
import FAQ from "./Pages/subpages/FAQ";
import './App.css';
import { Fragment } from 'react';
import AboutUs from './Pages/subpages/AboutUs';
import PrivacyPolicy from './Pages/subpages/PrivacyPolicy';
import Win from './Pages/subpages/Win';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/progress" element={<Progress />}/>
        <Route path="/leaderboard" element={<Leaderboard />}/>
        <Route path="/leveloverview" element={<LevelOverview />}/>
        <Route path="/game" element={<Game />}/>
        <Route path="/faq" element={<FAQ />}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/privacy_policy" element={<PrivacyPolicy/>}/>
        <Route path="/win" element={<Win/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;