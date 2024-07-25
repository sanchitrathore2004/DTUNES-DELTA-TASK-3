import React, { useContext, useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling'
import SongCard from './SongCard';
import songContext from '../../contexts/songContext';
import SpinnerLoader from './SpinnerLoader';
let checkGenre=[];

function MyActivity() {
    const {recommendedSong, setRecommendedSong} = useContext(songContext);
    const [artistNames, setArtistNames] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(null);
    const{userInfo, setUserInfo} = useContext(songContext);
    const [loaded, setLoaded] = useState(false);
    useEffect(()=>{
      const getData = async () => {
        if(recommendedSong.length>0){
          let totalSongs=0;
        recommendedSong.forEach(element => {
          totalSongs+=parseInt(element.frequency);
        });
        await setNumberOfSongs(totalSongs);
        setLoaded(true);
      }
      else{
        setLoaded(true);
      }
      }
      getData();
    });
  return (
    <div>
        <LoggedInUI>
        {!loaded && <div className='w-full h-full'><SpinnerLoader /></div>}
            <div className='px-[2vw] py-[0.8vw] text-[2.2vw] font-bold text-white'>Recap of your last week</div>
            {recommendedSong.length>0 && recommendedSong.map((item)=>{
                return <div className=''> <div className='mx-[2vmax] text-[1.5vmax] text-white font-semibold '>You Listened to <span style={{color: '#1DB954'}} className='font-bold'>{item.songId.name}</span><span className='font-bold text-[2vmax]'>{" "+item.frequency}</span> Times</div> <SongCard info={item.songId} /> </div>
            })}
            <div className='w-full px-[2vw] py-[0.8vw] text-[1.5vw] font-semibold'>
            <div className='text-[2.2vmax] font-bold text-white'>{userInfo.firstName} here are the Artists you like the most</div>
              {recommendedSong.length>0 && recommendedSong.map((item)=>{
                return <div><ArtistCard info={item} Songs={numberOfSongs} /></div>
              })}
            </div>
            <div className='w-full px-[2vw] py-[0.8vw] text-[1.5vw] font-semibold'>
            <div className='text-[2.2vmax] font-bold text-white'>Your Most Favorite Geners</div>
              {recommendedSong.length>0 && recommendedSong.map((item)=>{
                return <div><GenreCard info={item} Songs={numberOfSongs} /></div>
              })}
            </div>
        </LoggedInUI>
    </div>
  )
}

const ArtistCard = ({info, Songs}) => {
  return (
    <div className={`text-white mx-[2vmax]`}>
      <span className='text-[2vmax] font-bold'>{Math.floor((((parseInt(info.frequency))/Songs)*100))}%</span> of Your Most Listened Songs Are Of <span className='text-[2vmax] font-bold' style={{color: '#1DB954'}}>{info.songId.artistName}</span>
    </div>
  )
}

const GenreCard = ({info, Songs}) => {
  const [check, setCheck] = useState(true);
  useEffect(()=>{
    console.log(checkGenre);
    if(checkGenre.includes(info.songId.genre)){
      console.log('return');
      setCheck(false);
    }
    checkGenre.push(info.songId.genre);
  },[]);
  return (
    <div>
    { check && <div className={`text-white mx-[2vmax]`}>
      You Listen To {Math.floor((((parseInt(info.frequency))/Songs)*100))}% <span className='text-[2vmax] font-bold' style={{color: '#1DB954'}}>{info.songId.genre}</span>
    </div>}
    </div>
  )
}

export default MyActivity