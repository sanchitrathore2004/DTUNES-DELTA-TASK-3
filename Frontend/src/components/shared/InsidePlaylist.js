import React, { useContext, useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import songContext from '../../contexts/songContext'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';
import SongCard from './SongCard';
import { Howl, Howler } from 'howler';

function InsidePlaylist() {
  const {playlist} = useContext(songContext);
  const [songData, setSongData] = useState([]);
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
          html5: true
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

  return (
    <div>
        <LoggedInUI>
          <div className='text-black font-bold text-3xl p-10'>{playlistName}</div>
            {songData.map((item)=>{
              return <SongCard playMusic={playMusic} info={item} />
            })}
        </LoggedInUI>
    </div>
  )
}

export default InsidePlaylist