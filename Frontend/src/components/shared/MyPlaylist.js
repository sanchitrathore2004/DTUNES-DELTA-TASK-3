import React, { useContext, useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import {makeAuthenticatedGETRequest} from '../../utils/apiCalling';
import { useNavigate } from 'react-router-dom';
import songContext from '../../contexts/songContext';
import moreIcon from '../../assets/more (1).png';
import toast from 'react-hot-toast';

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
  const saveRecents = async (id) => {
    const response = await makeAuthenticatedGETRequest('/me/save/recents/'+id);
    console.log(response);
}
const deletePlaylist = async (id) => {
  const response = await makeAuthenticatedGETRequest('/playlist/delete/playlist/'+id);
  if(response && !response.err){
    toast.success("Playlist Deleted");
    console.log(response);
  }
}
  return (
      <div onClick={(e)=>{
          e.preventDefault();
          setPlaylist(playlistId);
          saveRecents(playlistId);
          navigation('/insideplaylist');
      }} className='cursor-pointer hover:bg-zinc-900 p-[0.5vw] flex flex-col items-center justify-end text-white relative bg-black w-1/5 m-[1vw] h-[18vw] rounded-md'>
          <div className='flex justify-center items-center w-full h-full relative'><img className='w-full h-full rounded-md' src={thumbnail} />
          <div className='top-0 p-[0.2vmax] right-0 absolute'><img className='w-[2vmax]' onClick={(e)=>{
            e.stopPropagation();
            e.preventDefault();
            deletePlaylist(playlistId);
          }} src='https://cdn-icons-png.freepik.com/512/7078/7078067.png' /></div></div>
          <div className='font-semibold text-[1.2vw] p-[0.3vw]'>{title}</div>
          <div className='text-[0.8vw] text-gray p-[0.3vw]'>{description}</div>
      </div>
  )
}

export default MyPlaylist