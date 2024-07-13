import React, { useContext } from 'react'
import levelsImage from '../../assets/levels.jpg';
import songContext from '../../contexts/songContext';
import likeImage from '../../assets/like-icon-2.jpg'
import { makeAuthenticatedPOSTRequest } from '../../utils/apiCalling';

function SongCard({info, playMusic}) { 

  const {currentSong, setCurrentSong} = useContext(songContext);

  const saveDetail = async () => {
    console.log('aaya');
    const body = { songId: info._id };
    console.log(body);
    const response = await makeAuthenticatedPOSTRequest('/me/save/live/song', body);
    console.log(response);
  }

  return (
    <div className='p-[1.5vw]'>
        <div onClick={()=>{
          saveDetail();
          setCurrentSong(info)}} className='bg-black hover:bg-gray-900 flex mx-[2vw] rounded-[0.5vmax] cursor-pointer h-[3.3vw]'>
        <div className='text-white w-[3.1vw] h-full object-cover flex justify-center items-center mx-[0.5vw]'><img className='rounded-md' src={info.thumbnail} /></div>
        <div className='w-full text-white flex flex-col justify-center text-[1.2vw] px-[1vw]'>
            <div className='hover:underline font-semibold'>
                {info.name}
            </div>
            <div className='text-[0.8vw]'>
                {info.artistName}
            </div>
        </div>
        <div className='w-[2.9vw] flex justify-center items-center h-full'><img className='rounded-full w-fit h-fit' src={likeImage} /></div>
        <div className='h-full flex justify-center items-center text-white text-[1.6vw] font-bold mx-[1vw]'>{info.likeCount}</div>
        </div>
    </div>
  )
}

export default SongCard