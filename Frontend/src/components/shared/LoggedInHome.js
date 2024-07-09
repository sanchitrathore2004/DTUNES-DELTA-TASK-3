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
import SongCard from './SongCard';
import { format } from 'date-fns';

function LoggedInHome () {
    const [playlist, setPlaylist] = useState([]);
    const {accountType, setAccountType} = useContext(songContext);
    const [friendActivity, setFriendActivity] = useState([]);

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

        useEffect(()=>{
    
            const getFriendsActivity = async () => {
              const response = await makeAuthenticatedGETRequest('/me/get/my/details/only');
              console.log(response); 
              await setFriendActivity(response.data.friends);
            }
            getFriendsActivity();
            },[]);
          
            useEffect(()=>{
              console.log(friendActivity);
            },[friendActivity]);

            useEffect(()=>{
                const getData = async () => {
                const response = await makeAuthenticatedGETRequest('/me/get/playback/history');
                console.log(response);
            }
            getData();
            },[]);

    return(
    <LoggedInUI>
            <div className='h-full w-full overflow-auto' style={{backgroundColor:'#74F0ED'}}>
                {/* <PlayList titleName='Punjabi Playlist' />
                <PlayList titleName='Bollywood' /> */}

                <PlayList titleName='Exciting Plalists' />

                <div className='flex mx-[1.5vw] items-center flex-wrap'>
                {playlist && playlist.map((item)=>{
                    return <Cards thumbnail={item.thumbnail} title={item.name} description={item.owner} playlistId={item._id} />
                })}
                </div>
                <div className='px-[2.2vw] py-[0.8vw] text-[2.2vw] font-bold'>
                    Friend's Activity
                </div>
                <div>
                    {friendActivity && friendActivity.map((item)=>{
                        return( item.liveUpdate.songId && 
                            <div>
                                <div className='mx-[3vw] text-[1.3vw] font-semibold'>{item.firstName} was listening to <span style={{color: '#EA445A'}} className='font-bold'>{item.liveUpdate.songId.name}</span> at {format(new Date(item.liveUpdate.timestamp), 'HH:mm:ss')}</div>
                            <SongCard info={item.liveUpdate.songId} /> </div>)
                    })}
                </div>
            </div> 
    </LoggedInUI>
    )
}

function PlayList ({titleName, info}) {
    return (
        <div className=' px-[2vw] py-[0.8vw] font-semibold'><div className='text-[2.2vw] font-bold'>{titleName}</div>
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
        }} className='cursor-pointer hover:bg-zinc-900 p-[0.5vw] flex flex-col items-center justify-end text-white bg-black w-1/5 m-[1vw] h-[18vw] rounded-md'>
            <div className='flex justify-center items-center w-full h-full'><img className='w-full h-full rounded-md' src={thumbnail} /></div>
            <div className='font-semibold text-[1.2vw] p-[0.3vw]'>{title}</div>
            <div className='text-[0.8vw] text-gray p-[0.3vw]'>Created By - {description.firstName}</div>
        </div>
    )
}

export default LoggedInHome