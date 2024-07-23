import React, { useState } from 'react'
import LoggedInUI from './LoggedInUI'
import UploadInput from './UploadInput'
import { makeAuthenticatedPOSTRequest } from '../../utils/apiCalling';
import { useNavigate } from 'react-router-dom';
import DroupDown from './DroupDown';
import {toast} from 'react-hot-toast';

function CreatePlaylist() {
    const navigate = useNavigate();

    const makePlaylist = async () => {
        const data = {name, thumbnail, visibility};
        const response = await makeAuthenticatedPOSTRequest('/playlist/create', data);
        console.log(response);
        if(response && !response.err){
            toast.success("Playlist Created");
            navigate('/myplaylist');
        }
    }

    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [visibility, setVisibility] = useState("");
  return (
    <div>
        <LoggedInUI>
        <div className='h-9/10 overflow-none' >
        <PlayList titleName='Create Playlist' />
        <div className='flex p-[1vmax] w-full'>
                <UploadInput value={name} setValue={setName} label='Name' placeholder='Name of Your Song' />
                <UploadInput value={thumbnail} setValue={setThumbnail} label='Thumbnail' placeholder='Link for your Thumbnail' />
                <DroupDown value={visibility} setValue={setVisibility} />
                </div>
                <div className='w-full flex items-center mx-[2.5vmax] my-[1.5vmax]'>
                <button onClick={(e)=>{
                    e.preventDefault();
                    makePlaylist();
                }} style={{backgroundColor: '#1db954'}} className='p-[1.5vmax] rounded-full text-[1vmax] text-white font-bold cursor-pointer'>Create Playlist</button>
                </div>
            </div>
        </LoggedInUI>
    </div>
  )
} 

function PlayList ({titleName}) {
    return (
        <div className='px-[2vw] py-[0.8vw] text-white font-semibold'><div className='text-[2.2vmax] font-bold'>{titleName}</div>
       </div>
    )
}

export default CreatePlaylist