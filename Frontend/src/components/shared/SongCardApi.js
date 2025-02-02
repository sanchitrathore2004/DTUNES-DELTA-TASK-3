import React, { useContext } from 'react'
import levelsImage from '../../assets/levels.jpg';
import songContext from '../../contexts/songContext';
import likeImage from '../../assets/like-icon-2.jpg'

function SongCardApi({info, playMusic}) { 

  const {currentSongFromApi, setCurrentSongFromApi} = useContext(songContext);
  console.log(currentSongFromApi);

  return (
    <div className='p-4'>
        <div onClick={()=>{setCurrentSongFromApi(info)}} className='bg-black hover:bg-gray-900 flex mx-12 rounded-md cursor-pointer h-14'>
        <div className='text-white w-12 h-full object-cover flex justify-center items-center mx-2'><img className='rounded-md' src={info.album.images[0].url} /></div>
        <div className='w-full text-white flex flex-col justify-center px-5'>
            <div className='hover:underline font-semibold'>
                {info.name}
            </div>
            <div className='text-xs'>
                {info.artists[0].name}
            </div>
        </div>
        <div className='w-10 flex justify-center items-center h-full mx-2'><img className='rounded-full w-fit h-fit' src={likeImage} /></div>
        {/* <div className='h-full flex justify-center items-center text-white text-xl font-bold mx-3'>{info.likeCount}</div> */}
        </div>
    </div>
  )
}

export default SongCardApi