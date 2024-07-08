import { createContext } from "react";

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong)=>{},
    musicPlayed: null,
    setMusicPlayed: (currentSong)=>{},
    paused: null,
    setPaused: (paused)=>{},
    playlist: null,
    setPlaylist: (playlist)=>{},
    songData: null,
    setSongData: (songData)=>{},
    currentSongFromApi: null,
    setCurrentSongFromApi: (currentSongFromApi)=>{},
    accountType: null,
    setAccountType: (accountType)=>{},
    partyModeActivated: null,
    setPartyModeActivated: (partyModeActivated)=>{},
    partyModeData: null,
    setPartyModeData: (partyModeData)=>{},
    partyModeFriendName: null,
    setPartyModeFriendName: (partyModeFriendName)=>{},
});

export default songContext 