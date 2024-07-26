import React from 'react'
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();
  return (
    <div style={{background: 'linear-gradient(45deg,#212121, #0F5132)'}} className='w-full h-screen flex flex-col justify-center items-center bg-black text-white'><img className='w-[25vmax] h-[20vmax]' src='https://cdn-icons-png.flaticon.com/512/6478/6478111.png' /><div className='w-full flex justify-center items-center'><span className='flex h-full justify-center items-center font-bold text-[8vmax]'>404</span><span className='flex h-full justify-end items-center text-[3vmax] font-semibold'>Not Found</span></div><button onClick={(e)=>{
        e.preventDefault();
        navigate('/');
    }} style={{ 
      background: 'linear-gradient(45deg,#0000, #1DB954)', 
      color: 'white' 
    }} className='text-black bg-white w-[8vmax] text-[1.3vmax] font-bold p-[0.8vmax] my-[0.5vmax] rounded-[0.5vmax]'>Go Back</button></div>
  )
}

export default Error