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
import Input from './Input';
import UploadInput from './UploadInput';
import CloudinaryUpload from './CloudinaryUpload';
import { makeAuthenticatedPOSTRequest } from '../../utils/apiCalling';
import { Link, useNavigate } from 'react-router-dom';

function UploadSongs() {
    const navigate = useNavigate();

    const uploadBtn = async () => {
        console.log(name,thumbnail,link,fileName);
        const data = {name, thumbnail, track: link};
        const response = await makeAuthenticatedPOSTRequest('/song/create', data);
        if(response.err){
            alert('Song not created');
        }
        console.log(response);
        navigate('/loggedin/home');
    }
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [link, setLink] = useState("");
    const [fileName, setFileName] = useState("");
    console.log(window.cloudinary);
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
                <PlayList titleName='Upload Your Song' />
                <div className='flex p-2 w-full'>
                <UploadInput value={name} setValue={setName} label='Name' placeholder='Name of Your Song' />
                <UploadInput value={thumbnail} setValue={setThumbnail} label='Thumbnail' placeholder='Link for your Thumbnail' />
                </div>
                <div className='flex justify-evenly'>
                    {fileName ? (
                        <div className='text-base font-bold mx-5'> 
                            {`Uploaded File Name : ${fileName}`}
                        </div>
                    ) : (
                    <CloudinaryUpload setUrl={setLink} setName={setFileName}/>
                    )
                }
                <div onClick={(e) => {
                    e.preventDefault();
                    uploadBtn();
                }} style={{backgroundColor: '#EA445A'}} className=' flex text-white w-1/6 justify-center items-center font-bold cursor-pointer rounded-full'>Upload Song</div>
                </div>  
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

function Cards ({thumbnail, title, description}) {
    return (
        <div className='cursor-pointer hover:bg-zinc-900 p-2 flex flex-col items-center justify-end text-white bg-black w-1/5 mx-2 rounded-md'>
            <div className='my-2'><img className='w-full h-auto h-full rounded-md' src={thumbnail} /></div>
            <div className='font-semibold text-lg'>{title}</div>
            <div className='text-sm text-gray'>{description}</div>
        </div>
    )
}

export default UploadSongs