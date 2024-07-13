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
import LoggedInUI from './LoggedInUI';

function UploadSongs () {
    const navigate = useNavigate();

    const uploadBtn = async () => {
        console.log(name,thumbnail,link,fileName);
        const data = {name, thumbnail, track: link, lyrics, artistName, tags, genre};
        const response = await makeAuthenticatedPOSTRequest('/song/create', data);
        if(response.err){
            alert('Song not created');
        }
        console.log(response);
        navigate('/loggedin/home');
    }
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [artistName, setArtistName] = useState("");
    const [tags, setTags] = useState("");
    const [genre, setGenre] = useState("");
    const [link, setLink] = useState("");
    const [fileName, setFileName] = useState("");
    console.log(window.cloudinary);

    return (
        <LoggedInUI>
            <div className='h-full overflow-auto'>
                <PlayList titleName='Upload Your Song' />
                <div className='flex p-2 w-full flex-col'>
                <UploadInput value={name} setValue={setName} label='Name' placeholder='Name of Your Song' />
                <UploadInput value={thumbnail} setValue={setThumbnail} label='Thumbnail' placeholder='Link for your Thumbnail' />
                <UploadInput value={lyrics} setValue={setLyrics} label='Lyrics' placeholder='Enter Song Lyrics' />
                <UploadInput value={artistName} setValue={setArtistName} label='Artist Name' placeholder='Enter Artist Name' />
                <UploadInput value={tags} setValue={setTags} label='Tags' placeholder='Enter Tags Separated by blank space' />
                <UploadInput value={genre} setValue={setGenre} label='Genre' placeholder='Whats the Genre of your song' />
                </div>
                <div className='flex justify-evenly'>
                    {fileName ? (
                        <div className='text-base font-bold mx-5'> 
                            {`Uploaded File Name : ${fileName}`}
                        </div>
                    ) : (
                    <div className='flex justify-center items-center'><CloudinaryUpload setUrl={setLink} setName={setFileName}/></div>
                    )
                }
                <div onClick={(e) => {
                    e.preventDefault();
                    uploadBtn();
                }} style={{backgroundColor: '#EA445A'}} className='my-[1.5vw] flex p-[1vw] text-white w-1/6 h-full text-[1.3vw] justify-center items-center font-bold cursor-pointer rounded-full'>Upload Song</div>
                </div>  
        </div>
        </LoggedInUI>
    )
}

function PlayList ({titleName}) {
    return (
        <div className='px-[2vw] py-[0.8vw] font-semibold'><div className='text-[2.2vw] font-bold'>{titleName}</div>
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