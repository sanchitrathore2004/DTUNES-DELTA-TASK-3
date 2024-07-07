import React, { useContext, useEffect, useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import playBtn from '../../assets/play-3.png';
import pauseBtn from '../../assets/pause-2.png';
import LoggedInUI from './LoggedInUI';
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';
import songContext from '../../contexts/songContext';

function LoggedInHome () {
    const [playlist, setPlaylist] = useState([]);
    const {accountType, setAccountType} = useContext(songContext);

    useEffect(()=>{
        const getPlaylist = async () => {
            const response = await makeAuthenticatedGETRequest('/playlist/get/all/playlist');
            console.log(response.data);
            setPlaylist(response.data);
        }
        getPlaylist();
    },[]);

    useEffect(()=>{
    
        const getUserIdType = async () => {
          const response = await makeAuthenticatedGETRequest('/me/get/my/details');
          console.log(response); 
          await setAccountType(response.data.accountType);
        }
        getUserIdType();
        },[]);
      
        useEffect(()=>{
          console.log(accountType);
        },[accountType]);

    return(
    <LoggedInUI>
            <div className='h-9/10 overflow-auto' style={{backgroundColor:'#74F0ED'}}>
                {/* <PlayList titleName='Punjabi Playlist' />
                <PlayList titleName='Bollywood' /> */}

                <PlayList titleName='Exciting Plalists' />

                <div className='flex items-center flex-wrap'>
                {playlist && playlist.map((item)=>{
                    return <Cards thumbnail={item.thumbnail} title={item.name} description={item.owner} playlistId={item._id} />
                })}
                </div>

            </div> 
    </LoggedInUI>
    )
}

function PlayList ({titleName, info}) {
    return (
        <div className=' px-8 py-2 font-semibold'><div className='text-3xl font-bold p-2'>{titleName}</div>
       </div>
    )
}

function Cards ({thumbnail, title, description, playlistId}) {
    const navigation = useNavigate();
    const {playlist, setPlaylist} = useContext(songContext);
    return (
        <div onClick={(e)=>{
            e.preventDefault();
            setPlaylist(playlistId);
            navigation('/insideplaylist');
        }} className='cursor-pointer hover:bg-zinc-900 p-2 flex flex-col items-center justify-end text-white bg-black w-1/5 mx-5 my-5 h-64 rounded-md'>
            <div className='my-2'><img className='w-fit h-auto h-full rounded-md' src={thumbnail} /></div>
            <div className='font-semibold text-lg p-3'>{title}</div>
            <div className='text-sm text-gray p-2'>Created By - {description.firstName}</div>
        </div>
    )
}

export default LoggedInHome