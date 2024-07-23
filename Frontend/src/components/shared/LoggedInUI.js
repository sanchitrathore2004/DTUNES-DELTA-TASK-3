import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import logo from '../../assets/logo-2.png';
import IconText from './IconText';
import homeIcon from '../../assets/home-icon.jpg';
import searchIcon from '../../assets/search-icon.png';
import playlistIcon from '../../assets/playlist.png';
import addIcon from '../../assets/add-icon-3.jpg';
import likeIcon from '../../assets/heart.png';
import Navigation from './Navigation';
import musicIcon from '../../assets/music-icon.jpg';
import { Link } from 'react-router-dom';
import { Howl } from 'howler';
import playBtn from '../../assets/play (1).png';
import pauseBtn from '../../assets/pause-button.png';
import songContext from '../../contexts/songContext';
import AddSongModal from '../../Modals/AddSongModal';
import ProfileModal from '../../Modals/ProfileModal';
import LoggedInNavigation from '../shared/LoggedInNavigation';
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../../utils/apiCalling';
import friendsIcon from '../../assets/friends-icon-2.png';
import PlayingSongModal from '../../Modals/PlayingSongModal';
import {toast} from 'react-hot-toast';

function LoggedInUI({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [playingSongModal, setPlayingSongModal] = useState(false);
    const {songData, setSongData} = useContext(songContext);
    const {partyModeData, setPartyModeData} = useContext(songContext); 
    // const [accountType, setAccountType] = useState("");

    const { currentSong, setCurrentSong, musicPlayed, setMusicPlayed, paused, setPaused, currentSongFromApi, setCurrentSongFromApi, accountType, setAccountType, whichBtn, setWhichBtn } = useContext(songContext);

    let firstUpdate = useRef(true);

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
        if(response && !response.err){
            if(response.data=='already liked'){
                const dislikeSong = await makeAuthenticatedGETRequest('/song/dislike/song/'+currentSong._id);
                console.log(dislikeSong);
                toast.success("Removed From Liked Songs");
            }
            else {toast.success("Added To Liked Songs");
            console.log(response);
        }
        }

        
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
                    <Link to='/home'><div onClick={(e)=>{
                        setWhichBtn('HOME');
                    }}><IconText icon={homeIcon} brigth={whichBtn} text="HOME" /></div></Link>
                    <Link to='/searchpage'><div  onClick={(e)=>{
                        setWhichBtn('SEARCH');
                    }}><IconText icon={searchIcon} brigth={whichBtn} text="SEARCH" /></div></Link>
                    <Link to='/myplaylist'><div  onClick={(e)=>{
                        setWhichBtn('PLAYLISTS');
                    }}><IconText icon={playlistIcon} brigth={whichBtn} text="PLAYLISTS" /></div></Link>
                    <Link to='/createplaylist'><div  onClick={(e)=>{
                        setWhichBtn('CREATE PLAYLISTS');
                    }}><IconText icon={addIcon} brigth={whichBtn} text="CREATE PLAYLISTS" /></div></Link>
                    <Link to='/liked/songs'><div  onClick={(e)=>{
                        setWhichBtn('LIKED SONGS');
                    }}><IconText icon={likeIcon} brigth={whichBtn} text="LIKED SONGS" /></div></Link>
                    <Link to='/friends'><div  onClick={(e)=>{
                        setWhichBtn('FRIENDS');
                    }}><IconText icon={friendsIcon} brigth={whichBtn} text="FRIENDS" /></div></Link>
                    {accountType=='artist' && <Link to='/mymusic'><div  onClick={(e)=>{
                        setWhichBtn('MY MUSIC');
                    }}><IconText icon={musicIcon} brigth={whichBtn} text="MY MUSIC" /></div></Link>}
                </div>
                <div className='w-4/5'>
                    <div className='h-[10vmin] bg-black text-gray-600 flex items-center justify-end justify-between'>
                    <Link to='/myactivity'><div onClick={(e)=>{setWhichBtn('My Activity')}} className={`flex items-center ${whichBtn=='My Activity' ? 'text-white' : 'text-gray-600'} justify-start text-[1.5vw] hover:text-white cursor-pointer font-bold`}>My Activity</div></Link>
                        <LoggedInNavigation onOpen={()=>setProfileModal(true)} firstText={accountType === 'artist' ? 'UPLOAD SONGS' : ''}  nextText='S' />
                    </div>
                    {/* backgroundColor: '#74F0ED' */}
                    <div className='overflow-auto' style={{height: 'calc(100% - 10vmin)', backgroundColor: '#212121' }}>
                        {children}
                    </div>
                </div>
            </div>
            {/* play bar */}
           { currentSong && <div className={`${currentSong ? `block` : `hidden`} hover:bg-gray-900 flex bg-black h-[5vmax] w-full text-white gap-[0.5vmax]`}>
                <div className='flex justify-center w-[7%] items-center mx-[1vmax]'>
                    <img className='w-[5vmax] p-[0.1vmax] rounded-full' src={currentSong ? currentSong.thumbnail : ""} alt="" />
                </div>
                <div className='flex flex-col justify-center cursor-pointer w-[15%] text-center items-center'>
                    <div  onClick={(e)=>{
            e.preventDefault();
            setPlayingSongModal(true);
           }} className='font-bold text-[1.1vmax] hover:underline'>
                        {currentSong ? currentSong.name : ""}
                    </div>
                    <div className='text-[0.9vmax]'>{currentSong ? `${currentSong.artistName}` : ""}</div>
                </div>
                <div className='flex flex-col justify-center h-full items-center w-[63%]'>
                    <div className='h-1/2'>
                        <img onClick={playSound} className='cursor-pointer w-[2.5vmax]' src={paused ? playBtn : pauseBtn} alt="Play/Pause Button" />
                    </div>
                    {/* <div>progress bar</div> */}
                </div>
                <div className='flex justify-center w-[15%] gap-[1vmax] items-center'><div><img onClick={(e)=>{
                    e.preventDefault();
                    setShowModal(true);
                }} className='cursor-pointer w-[3vmax]' src={playlistIcon}></img></div>
                <div><img onClick={(e=>{
                    e.preventDefault();
                    likeSong();
                })} className='w-[3vmax] rounded-full cursor-pointer' src={likeIcon}></img></div></div>
            </div> }
        </div>
    );
}

export default LoggedInUI;
