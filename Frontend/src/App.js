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
import { useContext, useEffect, useState } from "react";
import SearchPage from "./components/shared/SearchPage";
import CreatePlaylist from "./components/shared/CreatePlaylist";
import MyPlaylist from "./components/shared/MyPlaylist";
import InsidePlaylist from "./components/shared/InsidePlaylist";
import LikedSongs from "./components/shared/LikedSongs";
import ArtistSignUp from "./routes/ArtistSignUp";
import { makeAuthenticatedGETRequest } from "./utils/apiCalling";
import Notification from "./components/shared/Notification";
import Friends from "./components/shared/Friends";
import PartyMode from "./components/shared/PartyMode";
import MyActivity from "./components/shared/MyActivity";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [musicPlayed, setMusicPlayed] = useState(null);
  const [paused, setPaused] = useState(true);
  const [playlist, setPlaylist] = useState("");
  const [songData, setSongData] = useState([]);
  const [partyModeActivated, setPartyModeActivated] = useState(false);
  const [partyModeData, setPartyModeData] = useState([]);
  const [partyModeFriendName, setPartyModeFriendName] = useState("");
  const [cookie, setCookies] = useCookies(["token"]);
  const [accountType, setAccountType] = useState(null);
  const [currentSongFromApi, setCurrentSongFromApi] = useState(null);

  useEffect(()=>{
    
  const getUserIdType = async () => {
    const response = await makeAuthenticatedGETRequest('/me/get/my/details');
    console.log(response); 
    await setAccountType(response.data.accountType);
  }
  getUserIdType();
  },[]);

  useEffect(()=>{
    console.log(accountType);
  },[accountType]);

  return (
        <BrowserRouter> 
        {cookie.token ? (
          //logged in routes
          <songContext.Provider value={{currentSong,setCurrentSong, musicPlayed, setMusicPlayed, paused, setPaused, playlist, setPlaylist, songData, setSongData, currentSongFromApi, setCurrentSongFromApi, accountType, setAccountType, partyModeActivated, setPartyModeActivated, partyModeData, setPartyModeData, partyModeFriendName, setPartyModeFriendName}}> 
        <Routes>
          {accountType=='artist' ? (
            <>
            <Route path="/loggedin/home" element={<LoggedInHome />} />
          <Route path="*" element={<Navigate to='/loggedin/home' />}/>
          <Route path="/upload/songs" element={<UploadSongs />} />
          <Route path="/mymusic" element={<MyMusic />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/createplaylist" element={<CreatePlaylist />} />
          <Route path="/myplaylist" element={<MyPlaylist />} />
          <Route path="/insideplaylist" element={<InsidePlaylist />} />
          <Route path="/liked/songs" element={<LikedSongs />} />  
          <Route path="/notification" element={<Notification />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/partymode" element={<PartyMode />} />
          <Route path="/myactivity" element={<MyActivity />} />
            </>
          ):(
            <>
            <Route path="/myactivity" element={<MyActivity />} />
            <Route path="/partymode" element={<PartyMode />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/loggedin/home" element={<LoggedInHome />} />
          <Route path="*" element={<Navigate to='/loggedin/home' />}/>
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/createplaylist" element={<CreatePlaylist />} />
          <Route path="/myplaylist" element={<MyPlaylist />} />
          <Route path="/insideplaylist" element={<InsidePlaylist />} />
          <Route path="/liked/songs" element={<LikedSongs />} />
            </>
          )}
          </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
          <Route path="/artist/signup" element={<ArtistSignUp />} />
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
