import React, { useState } from 'react'
import {Howl, Howler} from 'howler';
import LoggedInUI from './LoggedInUI'
import Input from './Input'
import UploadInput from './UploadInput'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';
import SongCard from './SongCard';

function SearchPage() {
    const [value, setValue] = useState("");
    const [songData, setSongData] = useState([]);
    console.log(value);

    const searchSong = async () => {
        const response = await makeAuthenticatedGETRequest('/song/get/songname/'+value);
        console.log(response.data);
        setSongData(response.data) 
    }

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

  return (
    <div>
        <LoggedInUI>
            <div onKeyDown={(e)=>{
            if(e.key=="Enter"){
                searchSong();
            }
          }} className='w-full flex justify-center items-center '>
          <UploadInput value={value} setValue={setValue} label='Search' placeholder='Enter Song Name' />
            </div>
            <div>
                {
                songData.length > 0 && (
                <div className='flex justify-center items-center font-semibold p-3'> Showing Results For : <span className='font-bold'>"{value}"</span></div>
                )}
                {
                songData.length == 0 && (
                <div className='flex justify-center items-center font-semibold p-3'>Nothing to Show Please Modify Your Search</div>
                )}
                {songData.map((items)=>{
                    return <SongCard playMusic={playMusic} info={items} />;
                })}
            </div>
        </LoggedInUI>
    </div>
  )
}

export default SearchPage