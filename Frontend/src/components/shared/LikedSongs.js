import React, { useContext, useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';
import SongCard from './SongCard';
import { Howl, Howler } from 'howler';
import songContext from '../../contexts/songContext';
import SpinnerLoader from './SpinnerLoader';

function LikedSongs() {
  const [likedSongData, setlikedSongData] = useState([]);
  const {playlist} = useContext(songContext);
  const {currentSong} = useContext(songContext);
  const {songData, setSongData} = useContext(songContext);
  const [playlistName, setPLaylistName] = useState("");
  console.log(playlist);
  const [musicPlayed, setMusicPlayed] = useState(null);
  const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        const getLikedSongs = async () => {
            const data = await makeAuthenticatedGETRequest('/me/get/my/liked/song');
            console.log(data);
            console.log(data.data.likedSongs);
            setlikedSongData(data.data.likedSongs);
            await setSongData(data.data.likedSongs);
            setLoaded(true);
        }
        getLikedSongs();
    },[]);

    const playMusic = (songSrc) => {
      if(musicPlayed){
          musicPlayed.stop();
      }
      let sound = new Howl({
          src: [songSrc],
          html5: true,
          onend: () => {
            console.log('song ended');
            playNextSong();
          },
        });

        setMusicPlayed(sound);
        
        sound.play();
  }

  useEffect(()=>{
    console.log(songData);
    console.log(currentSong);
  },[songData]);

  useEffect(()=>{
    console.log(likedSongData);
  },[likedSongData]);

  const playNextSong = async () => {
    const currentIndex = songData.indexOf(currentSong);
    currentSong(songData[currentIndex]);
    console.log('new song',currentSong);
  }

  return (
    <div>
        <LoggedInUI>
        {!loaded && <div className='w-full h-full'><SpinnerLoader /></div>}
          <div className='px-[2vw] py-[0.8vw] text-[2.2vw] text-white font-bold'>Your Liked Songs</div>
          {likedSongData && likedSongData.map((item)=>{
            return <SongCard info={item} playMusic={playMusic} />
          })}
        </LoggedInUI>
    </div>
  )
}

export default LikedSongs