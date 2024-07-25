import React, { useEffect, useState } from 'react'
import {Howl, Howler} from 'howler';
import logo from '../../assets/logo-2.png';
import IconText from './IconText';
import homeIcon from '../../assets/home-icon.jpg';
import searchIcon from '../../assets/search-icon.png';
import playlistIcon from '../../assets/playlist-icon-3.png';
import addIcon from '../../assets/add-icon-3.jpg';
import likeIcon from '../../assets/like-icon-2.jpg';
import Navigation from './Navigation';
import siddhuImage from '../../assets/siddhu.jpg';
import guruImage from '../../assets/guru.jpg';
import hardyImage from '../../assets/hardy.jpg';
import diljitImage from '../../assets/diljit.jpeg';
import APImage from '../../assets/AP_Dhillon_CA.jpg';
import musicIcon from '../../assets/music-icon.jpg';
import { Link } from 'react-router-dom';
import SongCard from './SongCard';
import levelsImage from '../../assets/levels.jpg';
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';
import LoggedInUI from './LoggedInUI';
import SpinnerLoader from './SpinnerLoader';

const data = [{name:'LEVELS', thumbnail: 'https://c.saavncdn.com/220/Levels-feat-Sunny-Malton-Punjabi-2022-20220525101628-500x500.jpg', artist: 'Siddhu Moosewala'}];

function MyMusic() {
    const [songData, setSongData] = useState([]);
    const [musicPlayed, setMusicPlayed] = useState(null);
    const [loaded, setLoaded] = useState(false);

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

    // its a function which have a callback function which is called or shows effect only on page reload
    useEffect(()=>{
        // use effect callback function can't be async so we can't use an await statement inside it we will make another function

        const getData = async () => {
            const response=[];
             response.push(await makeAuthenticatedGETRequest('/song/get/mysongs'));
                console.log(response[0].data);
                await setSongData(response[0].data.songs); 
                setLoaded(true);
                console.log(songData);
        }
        getData();
    }, []);

    return (
        <LoggedInUI>
            {!loaded && <div className='w-full h-full'><SpinnerLoader /></div>}
            <div className='w-4/5'>
            <div className='h-9/10 overflow-auto'>
            <div className='px-[2vw] py-[0.8vw] text-white text-[2.2vw] font-bold'>
                My Songs
            </div>
            {/* songData.map Songcard ko call kr rha h jb bhi songdata me kuch new add ho rha h */}
                 {  songData.map((item) => {
                        return <SongCard key={item.id} info={item} playMusic={playMusic} />;
                    })}
            </div>
        </div>
            </LoggedInUI>
    )
}

function PlayList ({titleName}) {
    return (
        <div className='p-8 font-semibold'><div className='text-3xl font-bold p-2'>{titleName}</div>
       </div>
    )
}

export default MyMusic