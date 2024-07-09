import React, { useContext, useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import songContext from '../../contexts/songContext'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';
import SongCard from './SongCard';
import { Howl, Howler } from 'howler';

function InsidePlaylist() {
  const {playlist} = useContext(songContext);
  const {currentSong} = useContext(songContext);
  const {songData, setSongData} = useContext(songContext);
  const [playlistName, setPLaylistName] = useState("");
  console.log(playlist);
  const [musicPlayed, setMusicPlayed] = useState(null);


  //for music streaming we are using howler 

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
    const getData = async () => {
      
      const response = await makeAuthenticatedGETRequest('/playlist/get/playlist/'+playlist);
      console.log(response);
      setSongData(response.songs);
      setPLaylistName(response.name)
      console.log(playlistName);
    }
    getData();
  },[]);

  useEffect(()=>{
    console.log(songData);
    console.log(currentSong);
  },[songData]);

  const playNextSong = async () => {
    const currentIndex = songData.indexOf(currentSong);
    currentSong(songData[currentIndex]);
    console.log('new song',currentSong);
  }

  return (
    <div>
        <LoggedInUI>
          <div className='text-black font-bold text-[2.2vw] px-[2vw] py-[0.8vw]'>{playlistName}</div>
            {songData.map((item)=>{
              return <SongCard playMusic={playMusic} info={item} />
            })}
        </LoggedInUI>
    </div>
  )
}

export default InsidePlaylist