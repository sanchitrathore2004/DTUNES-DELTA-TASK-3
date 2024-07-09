import React, { useContext, useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import {makeAuthenticatedGETRequest} from '../../utils/apiCalling';
import { useNavigate } from 'react-router-dom';
import songContext from '../../contexts/songContext';

function MyPlaylist() {
  const [playlistData, setPlaylistData] = useState([]);

    useEffect(()=>{
        const getPlaylist = async () => {
            const response = await makeAuthenticatedGETRequest('/playlist/get/my/playlist');
            console.log(response.data);
            setPlaylistData(response.data);
        }
        getPlaylist();
    },[]);
  return (
    <div>
        <LoggedInUI> 
          <div className='font-bold text-[2.2vw] px-[2vw] py-[0.8vw]'>Your Playlists</div>
          <div className='flex mx-[1.5vw]'>
          {playlistData.map((item)=>{
            console.log(item);
           return <Cards thumbnail={item.thumbnail} title={item.name} description={item.visibility} playlistId={item._id} />
          })}
          </div>
        </LoggedInUI>
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
          <div className='text-[0.8vw] text-gray p-[0.3vw]'>{description}</div>
      </div>
  )
}

export default MyPlaylist