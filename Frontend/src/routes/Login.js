import React from 'react'
import logo from '../assets/logo-2.png';
import Input from '../components/shared/Input';
import Password from '../components/shared/Password';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='w-full h-screen bg-zinc-900 flex flex-col justify-center items-center' style={{backgroundColor: '#74F0ED'}}>
        <div className='flex flex-col bg-white rounded-md w-4/12 h-3/4' style={{backgroundColor: '#000000'}}>
        <div className='w-full h-1/4 flex justify-center'><img src={logo} alt='logo'/></div>
        <div className='w-full h-3/4 flex flex-col justify-center items-center'>
        <Input label="Email or Username" placeholder="Email" />
        <Password label="Password" placeholder="Password" />
        <div className='p-4'><button style={{backgroundColor:'#EA445A'}} className='rounded-md text-white p-2 font-bold text-xs bg-white'>LOGIN</button></div>
        <div className='text-white text-xs'>Don't have an Account? <Link to='/signup' className='font-bold cursor-pointer'>Register</Link></div>
        </div>
        </div>        
    </div>
  )
}

export default Login