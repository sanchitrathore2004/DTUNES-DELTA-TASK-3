import React, { useContext } from 'react'
import songContext from '../contexts/songContext'

function PlayingSongModal({onClose}) {
    const {currentSong, setCurrentSong} = useContext(songContext);
    console.log(currentSong);
  return (
    <div className='h-full w-full bg-black bg-opacity-80 absolute flex justify-center items-center text-white'>
        <div className='w-3/4 h-3/4 flex'>
        <div className='rounded-md bg-opacity-80 h-full w-1/2 flex flex-col justify-center items-center'>
        <div className='p-[2vmax] flex justify-center items-center '> <img className='w-[25vmax] rounded-md' src={currentSong.thumbnail} /> </div>
        <div className='text-white font-bold text-[1.7vmax]'>{currentSong.name}</div>
        <div className='text-white text-[1.1vmax] font-semibold'>{currentSong.artistName}</div>
        </div>
        <div className='text-white text-xl font-semibold h-full rounded-md w-1/2 bg-opacity-80 flex justify-center itmes-center'>
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='text-[1.7vmax] font-bold text-white h-1/10 flex justify-center items-center'>Lyrics</div>
            <div className='overflow-auto text-[1.1vmax] text-white text-center p-5'>{currentSong.lyrics}</div>
        </div>
        </div>
        <div onClick={onClose} className='top-0 right-0 text-[2.2vmax] font-bold mx-2 cursor-pointer'>X</div>
        </div>
    </div>
  )
}

export default PlayingSongModal