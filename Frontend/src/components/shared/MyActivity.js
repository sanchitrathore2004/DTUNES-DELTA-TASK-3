import React, { useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling'
import SongCard from './SongCard';

function MyActivity() {
    const [sortedSongIds, setSortedSongIds] = useState([]);

    useEffect(()=>{
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest('/me/get/playback/history');
            console.log(response);
            setSortedSongIds(response.data);
        }
        getData();
    },[]);
    useEffect(()=>{
        console.log(sortedSongIds);
    },[sortedSongIds]);
  return (
    <div>
        <LoggedInUI>
            <div className='px-[2vw] py-[0.8vw] text-[2.2vw] font-bold'>Recap of your last week</div>
            {sortedSongIds && sortedSongIds.map((item)=>{
                return <SongCard info={item.songId} />
            })}
        </LoggedInUI>
    </div>
  )
}

export default MyActivity