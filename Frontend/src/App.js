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
import SearchPage from "./components/shared/SearchPage";
import CreatePlaylist from "./components/shared/CreatePlaylist";
import MyPlaylist from "./components/shared/MyPlaylist";
import InsidePlaylist from "./components/shared/InsidePlaylist";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [musicPlayed, setMusicPlayed] = useState(null);
  const [paused, setPaused] = useState(true);
  const [playlist, setPlaylist] = useState("");
  const [cookie, setCookies] = useCookies(["token"]);
  return (
        <BrowserRouter> 
        {cookie.token ? (
          //logged in routes
          <songContext.Provider value={{currentSong,setCurrentSong, musicPlayed, setMusicPlayed, paused, setPaused, playlist, setPlaylist}}> 
        <Routes>
          <Route path="/loggedin/home" element={<LoggedInHome />} />
          <Route path="*" element={<Navigate to='/loggedin/home' />}/>
          <Route path="/upload/songs" element={<UploadSongs />} />
          <Route path="/mymusic" element={<MyMusic />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/createplaylist" element={<CreatePlaylist />} />
          <Route path="/myplaylist" element={<MyPlaylist />} />
          <Route path="/insideplaylist" element={<InsidePlaylist />} />
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
