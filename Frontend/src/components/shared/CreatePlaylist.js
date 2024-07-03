import React, { useState } from 'react'
import LoggedInUI from './LoggedInUI'
import UploadInput from './UploadInput'
import { makeAuthenticatedPOSTRequest } from '../../utils/apiCalling';
import { useNavigate } from 'react-router-dom';
import DroupDown from './DroupDown';

function CreatePlaylist() {
    const navigate = useNavigate();

    const makePlaylist = async () => {
        const data = {name, thumbnail, visibility};
        const response = await makeAuthenticatedPOSTRequest('/playlist/create', data);
        console.log(response);
        if(response && !response.err){
            navigate('/myplaylist');
        }
    }

    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [visibility, setVisibility] = useState("");
  return (
    <div>
        <LoggedInUI>
        <div className='h-9/10 overflow-none' style={{backgroundColor:'#74F0ED'}}>
        <PlayList titleName='Create Playlist' />
        <div className='flex p-2 w-full'>
                <UploadInput value={name} setValue={setName} label='Name' placeholder='Name of Your Song' />
                <UploadInput value={thumbnail} setValue={setThumbnail} label='Thumbnail' placeholder='Link for your Thumbnail' />
                <DroupDown value={visibility} setValue={setVisibility} />
                </div>
                <div className='w-full flex items-center mx-10 my-5'>
                <button onClick={(e)=>{
                    e.preventDefault();
                    makePlaylist();
                }} style={{backgroundColor: '#EA445A'}} className='p-5 rounded-full text-white font-bold cursor-pointer'>Create Playlist</button>
                </div>
            </div>
        </LoggedInUI>
    </div>
  )
}

function PlayList ({titleName}) {
    return (
        <div className='p-8 font-semibold'><div className='text-3xl font-bold p-2'>{titleName}</div>
       </div>
    )
}

export default CreatePlaylist