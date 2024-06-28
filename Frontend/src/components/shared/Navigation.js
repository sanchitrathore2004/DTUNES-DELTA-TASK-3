import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <div className='flex items-center'>
        <div className='font-bold text-xs cursor-pointer hover:text-white'>ABOUT US</div>
        <div className='bg-white w-0.5 m-4 text-white'>'</div>
        <div className='text-xs font-bold cursor-pointer hover:text-white'><Link to='/signup' className='font-bold'>SIGN UP</Link></div>
    <div className='cursor-pointer font-bold p-1 mx-3 rounded-md text-xs text-white' style={{backgroundColor:'#EA445A'}}><Link to='/login' className='font-bold'>LOGIN</Link></div>
    </div>
  )
}

export default Navigation