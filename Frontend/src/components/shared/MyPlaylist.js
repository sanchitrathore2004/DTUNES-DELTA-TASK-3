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
          <div className='p-10 font-bold text-3xl'>Your Playlists</div>
          <div className='flex mx-10'>
          {playlistData.map((item)=>{
            console.log(item);
           return <Cards thumbnail={item.thumbnail} title={item.name} playlistId={item._id} />
          })}
          </div>
        </LoggedInUI>
    </div>
  )
}

function Cards ({thumbnail, title, description, playlistId}) {
  const {playlist, setPlaylist} = useContext(songContext);
  const navigation = useNavigate();
  const navigationFunc = () => {
    navigation('/insideplaylist');
  }
  return (
      <div onClick={(e)=>{
        e.preventDefault();
        setPlaylist(playlistId);
        navigationFunc();
      }} className='cursor-pointer hover:bg-zinc-900 p-2 flex flex-col items-center justify-end text-white bg-black w-1/5 mx-2 h-64 rounded-md'>
          <div className='my-2'><img className='w-full h-auto h-full rounded-md' src={thumbnail} /></div>
          <div className='font-semibold text-lg p-2'>{title}</div>
          <div className='text-sm text-gray'>{description}</div>
      </div>
  )
}

export default MyPlaylist