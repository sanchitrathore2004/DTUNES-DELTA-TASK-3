import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./components/shared/Home";
import { useCookies } from "react-cookie";
import LoggedInHome from "./components/shared/LoggedInHome";
import UploadSongs from "./components/shared/UploadSongs";
import MyMusic from "./components/shared/MyMusic";
import songContext from "./contexts/songContext";
import { useState } from "react";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [musicPlayed, setMusicPlayed] = useState(null);
  const [paused, setPaused] = useState(true);
  const [cookie, setCookies] = useCookies(["token"]);
  return (
        <BrowserRouter> 
        {cookie.token ? (
          //logged in routes
          <songContext.Provider value={{currentSong,setCurrentSong, musicPlayed, setMusicPlayed, paused, setPaused}}> 
        <Routes>
          <Route path="/loggedin/home" element={<LoggedInHome />} />
          <Route path="*" element={<Navigate to='/loggedin/home' />}/>
          <Route path="/upload/songs" element={<UploadSongs />} />
          <Route path="/mymusic" element={<MyMusic />} />
          </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />  
          <Route path="*" element={<Navigate to='/login' />}/>
        </Routes>
)};
        </BrowserRouter>
  );
}

export default App;
