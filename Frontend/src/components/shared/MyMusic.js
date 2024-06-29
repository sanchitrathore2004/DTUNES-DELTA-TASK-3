import React from 'react'
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

const data = [{name:'LEVELS', thumbnail: 'https://c.saavncdn.com/220/Levels-feat-Sunny-Malton-Punjabi-2022-20220525101628-500x500.jpg', artist: 'Siddhu Moosewala'}];

function MyMusic() {
  return (
    <div className='flex w-full h-screen overflow-hidden'>
        <div className='bg-black h-full flex gap-4 flex-col items-center w-1/5'>
            <div className='flex justify-center items-center p-2 my-3'><img src={logo} alt='logo' className='w-2/4'/></div>
            <div><IconText icon={homeIcon} text="HOME" /></div>
            <div><IconText icon={searchIcon} text="SEARCH" /></div>
            <div><IconText icon={playlistIcon} text="PLAYLISTS" /></div>
            <div><IconText icon={addIcon} text="CREATE PLAYLISTS" /></div>
            <div><IconText icon={likeIcon} text="LIKED SONGS" /></div>
            <Link to='/mymusic'><div><IconText icon={musicIcon} text="MY MUSIC" /></div></Link>
        </div>
        <div className='w-4/5'>
            <div className='h-1/10 bg-black text-gray-400 flex items-center justify-end'>
                <Navigation firstText='UPLOAD SONGS' nextText='S' />
            </div>
            <div className='h-9/10 overflow-auto' style={{backgroundColor:'#74F0ED'}}>
            <div className='p-8 text-2xl font-bold'>
                My Songs
            </div>
                {data.map((item) => {
                    return <SongCard info={item} />
                })}
            </div>
        </div>
    </div>
  )
}

function PlayList ({titleName}) {
    return (
        <div className='p-8 font-semibold'><div className='text-3xl font-bold p-2'>{titleName}</div>
       </div>
    )
}

export default MyMusic