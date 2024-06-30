import React, { useState } from 'react'
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
import { Howl, Howler } from 'howler';
import playBtn from '../../assets/play-3.png';
import pauseBtn from '../../assets/pause-2.png';
import LoggedInUI from './LoggedInUI';

function LoggedInHome () {
    return(
    <LoggedInUI>
            <div className='h-9/10 overflow-auto' style={{backgroundColor:'#74F0ED'}}>
                <PlayList titleName='Punjabi Playlist' />
                <PlayList titleName='Bollywood' />
            </div> 
    </LoggedInUI>
    )
}

function PlayList ({titleName}) {
    return (
        <div className='p-8 font-semibold'><div className='text-3xl font-bold p-2'>{titleName}</div>
        <div className='flex my-2'>
                <Cards thumbnail={siddhuImage} title='Siddhu Moosewala' description='Hit Punjabi Songs' />
                <Cards thumbnail={guruImage} title='Guru Randhawa' description='Hit Punjabi Songs' />
                <Cards thumbnail={hardyImage} title='Hardy Sandhu' description='Hit Punjabi Songs' />
                <Cards thumbnail={diljitImage} title='Diljit Dosanjh' description='Hit Punjabi Songs' />
                <Cards thumbnail={APImage} title='AP Dhillon' description='Hit Punjabi Songs' />
                </div></div>
    )
}

function Cards ({thumbnail, title, description}) {
    return (
        <div className='cursor-pointer hover:bg-zinc-900 p-2 flex flex-col items-center justify-end text-white bg-black w-1/5 mx-2 rounded-md'>
            <div className='my-2'><img className='w-full h-auto h-full rounded-md' src={thumbnail} /></div>
            <div className='font-semibold text-lg'>{title}</div>
            <div className='text-sm text-gray'>{description}</div>
        </div>
    )
}

export default LoggedInHome