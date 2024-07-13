import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../utils/apiCalling'
import songContext from '../contexts/songContext';
import {toast} from 'react-hot-toast';
import { Link } from 'react-router-dom';

function AddSongModal({onClose}) {
    const [playlistData, setPlaylistData] = useState([]);

    useLayoutEffect(()=>{
        const getPlaylistData = async () => {
            const response = await makeAuthenticatedGETRequest('/playlist/get/my/playlist');
            console.log(response.data);
            setPlaylistData(response.data);
        }
        getPlaylistData();
    },[]);

    useEffect(() => {
        console.log(playlistData); // This will log the updated playlistData
    }, [playlistData]);
    
  return (
    <div onClick={onClose} className='w-screen h-screen absolute bg-black text-white flex justify-center items-center bg-opacity-80'>
        <div className='overflow-auto w-[32vmax] h-[25vmax] flex flex-col rounded-md bg-zinc-900'>
            <div className='text-white p-[1vmax] font-bold text-[1.7vmax]'>
                Add To Playlist
            </div>
            {playlistData.map((item)=>{
                return <div key={item.name} className='h-1/4'><PlaylistCard info={item} /></div>
            })}
           <Link to='/createplaylist'> <div className='w-full flex justify-center items-center'>
            <button style={{backgroundColor: '#EA445A'}} className='my-[1vmax] text-white rounded-[0.5vmax] p-[0.1vmax] text-[1.3vmax] w-1/2 font-semibold'>Create New Playlist</button>
            </div></Link>
        </div>
    </div>
  )
}

function PlaylistCard ({info}) {
    const {currentSong} = useContext(songContext);

    const addSongToPlaylist = async (playId) => {
        console.log(playId,currentSong);
        const playlistId = playId;
        const songId = currentSong._id;
        const data = {playlistId, songId};

        const response = await makeAuthenticatedPOSTRequest('/playlist/add/song', data);
        if(response && !response.err){
            toast.success("Added to Playlist");
            console.log(response); 
        }   
    }

    return (
        <div onClick={(e)=>{
            e.preventDefault();
            addSongToPlaylist(info._id);
        }} className='flex h-full mx-10 my-3 text-white text-xl cursor-pointer hover:bg-zinc-700'>
            <div className='w-1/4 h-full flex justify-center items-center'><img className='mb-3 p-3 flex justify-center items-centerw-fit h-fit' src={info.thumbnail} /></div>
            <div className='font-bold px-[0.5vmax] text-[1.5vmax] flex justify-center items-center'>{info.name}</div>
        </div>
    )
}

export default AddSongModal