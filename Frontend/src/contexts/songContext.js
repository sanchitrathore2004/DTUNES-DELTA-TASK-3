import { createContext } from "react";

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong)=>{},
    musicPlayed: null,
    setMusicPlayed: (currentSong)=>{},
    paused: null,
    setPaused: (paused)=>{},
});

export default songContext 