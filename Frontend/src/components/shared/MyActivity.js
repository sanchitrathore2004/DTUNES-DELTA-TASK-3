import React, { useContext, useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling'
import SongCard from './SongCard';
import songContext from '../../contexts/songContext';

function MyActivity() {
    const {recommendedSong, setRecommendedSong} = useContext(songContext);
  return (
    <div>
        <LoggedInUI>
            <div className='px-[2vw] py-[0.8vw] text-[2.2vw] font-bold'>Recap of your last week</div>
            {recommendedSong && recommendedSong.map((item)=>{
                return <div className=''> <div className='mx-[2vmax] text-[1.5vmax] font-semibold '>You Listened to <span style={{color: '#EA445A'}} className='font-bold'>{item.songId.name}</span><span className='font-bold text-[2vmax]'>{" "+item.frequency}</span> Times</div> <SongCard info={item.songId} /> </div>
            })}
        </LoggedInUI>
    </div>
  )
}

export default MyActivity