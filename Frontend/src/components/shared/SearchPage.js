import React, { useState } from 'react'
import {Howl, Howler} from 'howler';
import LoggedInUI from './LoggedInUI'
import Input from './Input'
import UploadInput from './UploadInput'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';
import SongCard from './SongCard';
import UserCard from './UserCard';
import SongCardApi from './SongCardApi';

function SearchPage() {
    const [value, setValue] = useState("");
    const [songData, setSongData] = useState([]);
    const [apiSongData, setApiSongData] = useState([]);
    const [searchToggle, setSearchToggle] = useState("");
    const [userData, setUserData] = useState([]);
    console.log(value);

const searchSong = async () => {
    if (searchToggle === 'SONGS') {
        setUserData([]);

        const q = value;

        const response = await makeAuthenticatedGETRequest('/song/get/songname/'+value);
        console.log(response.data);
        setSongData(response.data); 

        try {
            let response = await fetch(`https://v1.nocodeapi.com/sanchit0610/spotify/nGprlezEVcXvcxuT/search?q=${q}&type=track`);
            let data = await response.json();
            console.log(data);

            if (data && data.tracks && data.tracks.items) {
                console.log(data.tracks.items);
                setApiSongData(data.tracks.items);
            } else {
                console.error('Unexpected response structure', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    else if(searchToggle=='ACCOUNTS'){
        setSongData([]);
        const response = await makeAuthenticatedGETRequest('/me/get/my/details/'+value);
        console.log(response)
        setUserData(response.data);
    }
    else{
        console.log('select a toggle');
    }
}

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
                console.log('ended');
            },
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
          <div onClick={(e)=>{
            e.preventDefault();
            setSearchToggle('SONGS');
          }} className={`text-white p-[1.1vmax] ${searchToggle=='SONGS' ? `bg-black`:`bg-zinc-700`} text-[1.1vmax] flex justify-center items-center font-bold rounded-[0.5vmax] mx-[0.7vmax] cursor-pointer`}>SONGS</div><div onClick={(e)=>{
            e.preventDefault();
            setSearchToggle('ACCOUNTS');
          }} className={`cursor-pointer ${searchToggle=='ACCOUNTS' ? `bg-black` : `bg-zinc-700`} text-white p-[1.1vmax] flex justify-center items-center text-[1.1vmax] font-bold rounded-[0.5vmax]`}>ACCOUNTS</div><UploadInput value={value} setValue={setValue} label='Search' placeholder='Enter Song Name' />
            </div>
            <div>
                {
                songData.length > 0 && (
                <div className='flex justify-center items-center font-semibold p-[1.5vmax] text-[1.1vmax]'> Showing Results For : <span className='font-bold'>"{value}"</span></div>
                )}
                {
                userData.length > 0 && (
                <div className='flex justify-center items-center font-semibold text-[1.1vmax] p-[1.5vmax]'> Showing Results For : <span className='font-bold'>"{value}"</span></div>
                )}
                {
                songData.length == 0 && userData.length==0 && (
                <div className='flex justify-center items-center text-[1.1vmax] font-semibold p-[1.5vmax]'>Nothing to Show Please Modify Your Search</div>
                )}
                {
                    searchToggle=='' && (
                        <div className='flex justify-center items-center text-[1.1vmax] font-semibold p-[1.5vmax]'>Please select a toggle to search</div>
                    )
                }
                {songData.map((items)=>{
                    return <SongCard playMusic={playMusic} info={items} />;
                })}
                {/* {apiSongData.map((items)=>{
                    return <SongCardApi playMusic={playMusic} info={items} />;
                })} */}
                {userData.map((item)=>{
                    return <UserCard info={item} />
                })}
            </div>
        </LoggedInUI>
    </div>
  )
}

export default SearchPage