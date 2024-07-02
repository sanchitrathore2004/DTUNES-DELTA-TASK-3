import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import logo from '../../assets/logo-2.png';
import IconText from './IconText';
import homeIcon from '../../assets/home-icon.jpg';
import searchIcon from '../../assets/search-icon.png';
import playlistIcon from '../../assets/playlist-icon-3.png';
import addIcon from '../../assets/add-icon-3.jpg';
import likeIcon from '../../assets/like-icon-2.jpg';
import Navigation from './Navigation';
import musicIcon from '../../assets/music-icon.jpg';
import { Link } from 'react-router-dom';
import { Howl } from 'howler';
import playBtn from '../../assets/play-3.png';
import pauseBtn from '../../assets/pause-2.png';
import songContext from '../../contexts/songContext';
import AddSongModal from '../../Modals/AddSongModal';
import ProfileModal from '../../Modals/ProfileModal';
import LoggedInNavigation from '../shared/LoggedInNavigation';
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';

function LoggedInUI({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);

    const { currentSong, setCurrentSong, musicPlayed, setMusicPlayed, paused, setPaused } = useContext(songContext);
    console.log(currentSong);

    let firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if(firstUpdate.current){
            firstUpdate.current=false;
            return ;
        }
        if (!currentSong) {
            return;
        }
        console.log('here');
        playMusic(currentSong.track);
    }, [currentSong && currentSong.track]);

    const playSound = () => {
        if (!currentSong) {
            return;
        }
        if (paused) {
            musicPlayed.play();
            setPaused(false);
        } else {
            musicPlayed.pause();
            setPaused(true);
        }
    };

    const playMusic = (songSrc) => {
        if (musicPlayed) {
            musicPlayed.unload(); // Unload the previous sound
        }
        const sound = new Howl({
            src: [songSrc],
            html5: true
        });

        setMusicPlayed(sound);
        setPaused(false);
        sound.play();
    };

    const likeSong = async () => {
        console.log(currentSong);
        const response = await makeAuthenticatedGETRequest('/song/like/song/'+currentSong._id);

        console.log(response);
    }

    return (
        <div className='h-screen w-full'>
            {profileModal && <ProfileModal onClose={()=> setProfileModal(false)} />}
             {showModal && <AddSongModal onClose={() => setShowModal(false)} />}
            <div className={`flex w-full ${currentSong ? `h-9/10` : `h-full`} overflow-hidden`}>
                <div className='bg-black h-full flex gap-4 flex-col items-center w-1/5'>
                    <div className='flex justify-center items-center p-2 my-3'>
                        <img src={logo} alt='logo' className='w-2/4' />
                    </div>
                    <Link to='/home'><div><IconText icon={homeIcon} text="HOME" /></div></Link>
                    <Link to='/searchpage'><div><IconText icon={searchIcon} text="SEARCH" /></div></Link>
                    <Link to='/myplaylist'><div><IconText icon={playlistIcon} text="PLAYLISTS" /></div></Link>
                    <Link to='/createplaylist'><div><IconText icon={addIcon} text="CREATE PLAYLISTS" /></div></Link>
                    <div><IconText icon={likeIcon} text="LIKED SONGS" /></div>
                    <Link to='/mymusic'><div><IconText icon={musicIcon} text="MY MUSIC" /></div></Link>
                </div>
                <div className='w-4/5'>
                    <div className='h-1/10 bg-black text-gray-400 flex items-center justify-end'>
                        <LoggedInNavigation onOpen={()=>setProfileModal(true)} firstText='UPLOAD SONGS' nextText='S' />
                    </div>
                    <div className='h-full overflow-auto' style={{ backgroundColor: '#74F0ED' }}>
                        {children}
                    </div>
                </div>
            </div>
            <div className={`${currentSong ? `block` : `hidden`} hover:bg-gray-900 flex bg-black h-20 w-full text-white gap-2`}>
                <div className='flex justify-center items-center mx-5'>
                    <img className='w-full h-full p-3 rounded-full' src={currentSong ? currentSong.thumbnail : ""} alt="" />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='font-bold hover:underline'>
                        {currentSong ? currentSong.name : ""}
                    </div>
                    <div className='text-xs'>{currentSong ? `${currentSong.artist.firstName} ${currentSong.artist.lastName}` : ""}</div>
                </div>
                <div className='flex flex-col justify-center items-center w-3/4'>
                    <div className='h-1/2'>
                        <img onClick={playSound} className='cursor-pointer w-full h-9/10' src={paused ? playBtn : pauseBtn} alt="Play/Pause Button" />
                    </div>
                    <div>progress bar</div>
                </div>
                <div className='flex justify-center items-center'><img onClick={(e)=>{
                    e.preventDefault();
                    setShowModal(true);
                }} className='cursor-pointer w-full h-1/2 mx-3' src='https://cdn-icons-png.flaticon.com/512/11065/11065753.png'></img>
                <img onClick={(e=>{
                    e.preventDefault();
                    likeSong();
                })} className='w-full h-1/2 rounded-full mx-3 cursor-pointer' src='https://banner2.cleanpng.com/20180330/aue/kisspng-facebook-like-button-computer-icons-thumb-signal-thumbs-up-5abddf56860ef2.1284314315223929185491.jpg'></img></div>
            </div>
        </div>
    );
}

export default LoggedInUI;
