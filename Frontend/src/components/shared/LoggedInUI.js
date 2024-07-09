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
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../../utils/apiCalling';
import friendsIcon from '../../assets/friends-icon-2.png';
import PlayingSongModal from '../../Modals/PlayingSongModal';

function LoggedInUI({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [playingSongModal, setPlayingSongModal] = useState(false);
    const {songData, setSongData} = useContext(songContext);
    const {partyModeData, setPartyModeData} = useContext(songContext); 
    // const [accountType, setAccountType] = useState("");

    const { currentSong, setCurrentSong, musicPlayed, setMusicPlayed, paused, setPaused, currentSongFromApi, setCurrentSongFromApi, accountType, setAccountType } = useContext(songContext);
    console.log(currentSong);

    let firstUpdate = useRef(true);

    console.log(songData);

    const saveDetail = async (info) => {
        console.log('aaya');
        const body = { songId: info._id };
        console.log(body);
        const response = await makeAuthenticatedPOSTRequest('/me/save/live/song', body);
        console.log(response);
      }

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
            html5: true,
            onend: () => {
                console.log('ended');
                if(songData.length!=0){
                playNextSong();
                }
                else if(partyModeData.length!=0){
                    playNextSongFromPartyMode();
                }
            }
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

    useEffect(()=>{
        console.log(songData);
        console.log(currentSong);
      },[songData]);
    
      const playNextSong = async () => {
        const currentIndex = songData.indexOf(currentSong);
        saveDetail(songData[currentIndex+1]);
        setCurrentSong(songData[currentIndex+1]);
        console.log('new song',currentSong);
      }

      const playNextSongFromPartyMode = async () => {
        const currentIndex = partyModeData.indexOf(currentSong);
        setCurrentSong(partyModeData[currentIndex+1]);
        console.log('new song',currentSong);
      }

    //   useEffect(()=>{
    //     const getAccountType = async () => {
    //         const response = await makeAuthenticatedGETRequest('/me/get/my/details');
    //         console.log(response);
    //         setAccountType(response.data.accountType);
    //     }
    //     getAccountType();
    //   },[]);

    //   useEffect(()=>{
    //     console.log(accountType);
    //   },[accountType]);

    return (
        <div className='h-screen w-full'>
            {profileModal && <ProfileModal onClose={()=> setProfileModal(false)} />}
             {showModal && <AddSongModal onClose={() => setShowModal(false)} />}
                {playingSongModal && <PlayingSongModal onClose={()=>setPlayingSongModal(false)} />}
            <div className={`flex w-full ${currentSong ? `h-9/10` : `h-full`} overflow-hidden`}>
                <div className='bg-black h-full gap-[0.5vw] flex flex-col items-center w-1/5'>
                    <div className='flex justify-center items-center p-2 my-[0.5vw]'>
                        <img src={logo} alt='logo' className='w-[7vw]' />
                    </div>
                    <Link to='/home'><div><IconText icon={homeIcon} text="HOME" /></div></Link>
                    <Link to='/searchpage'><div><IconText icon={searchIcon} text="SEARCH" /></div></Link>
                    <Link to='/myplaylist'><div><IconText icon={playlistIcon} text="PLAYLISTS" /></div></Link>
                    <Link to='/createplaylist'><div><IconText icon={addIcon} text="CREATE PLAYLISTS" /></div></Link>
                    <Link to='/liked/songs'><div><IconText icon={likeIcon} text="LIKED SONGS" /></div></Link>
                    <Link to='/friends'><div><IconText icon={friendsIcon} text="FRIENDS" /></div></Link>
                    {accountType=='artist' && <Link to='/mymusic'><div><IconText icon={musicIcon} text="MY MUSIC" /></div></Link>}
                </div>
                <div className='w-4/5'>
                    <div className='h-1/10 bg-black text-gray-400 flex items-center justify-end justify-between'>
                    <Link to='/myactivity'><div className='flex items-center justify-start text-[1.5vw] hover:text-white cursor-pointer font-bold'>My Activity</div></Link>
                        <LoggedInNavigation onOpen={()=>setProfileModal(true)} firstText={accountType === 'artist' ? 'UPLOAD SONGS' : ''}  nextText='S' />
                    </div>
                    <div className='h-9/10 overflow-auto' style={{ backgroundColor: '#74F0ED' }}>
                        {children}
                    </div>
                </div>
            </div>
            {/* play bar */}
           { currentSong && <div className={`${currentSong ? `block` : `hidden`} hover:bg-gray-900 flex bg-black h-20 w-full text-white gap-2`}>
                <div className='flex justify-center items-center mx-5'>
                    <img className='w-full h-full p-3 rounded-full' src={currentSong ? currentSong.thumbnail : ""} alt="" />
                </div>
                <div className='flex flex-col justify-center cursor-pointer text-center items-center'>
                    <div  onClick={(e)=>{
            e.preventDefault();
            setPlayingSongModal(true);
           }} className='font-bold hover:underline'>
                        {currentSong ? currentSong.name : ""}
                    </div>
                    <div className='text-xs'>{currentSong ? `${currentSong.artistName}` : ""}</div>
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
            </div> }
            {/* { currentSongFromApi && <div className={`${currentSongFromApi ? `block` : `hidden`} hover:bg-gray-900 flex bg-black h-20 w-full text-white gap-2`}>
                <div className='flex justify-center items-center mx-5'>
                    <img className='w-full h-full p-3 rounded-full' src={currentSongFromApi ? currentSongFromApi.album.images[0].url : ""} alt="" />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='font-bold hover:underline'>
                        {currentSongFromApi ? currentSongFromApi.name : ""}
                    </div>
                    <div className='text-xs'>{currentSongFromApi ? `${currentSongFromApi.artists[0].name}` : ""}</div>
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
            </div> } */}
        </div>
    );
}

export default LoggedInUI;
