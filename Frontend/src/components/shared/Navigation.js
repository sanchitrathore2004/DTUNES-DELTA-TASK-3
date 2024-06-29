import React from 'react'
import { Link } from 'react-router-dom'

function Navigation({firstText, nextText}) {
  return (
    <div className='flex items-center'>
        <div className='font-bold text-2xl cursor-pointer hover:text-white'>ABOUT US</div>
        <div className='bg-white w-0.5 m-4 text-white'>'</div>
        <div className='text-2xl font-bold cursor-pointer hover:text-white'><Link to={`${firstText=='SIGN UP'? `/signup` : `/upload/songs`}`} className='font-bold'>{firstText}</Link></div>
    <div className={`${nextText=='S'? `rounded-full w-12 flex items-center justify-center` : `rounded-md`} cursor-pointer font-bold p-2 mx-3 text-2xl text-white`} style={{backgroundColor:'#EA445A'}}><Link to='/login' className='font-bold'>{nextText}</Link></div>
    </div>
  )
}

export default Navigation