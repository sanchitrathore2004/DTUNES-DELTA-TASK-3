import React, { useState } from 'react'
import logo from '../assets/logo-2.png';
import Input from '../components/shared/Input';
import Password from '../components/shared/Password';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/apiCalling';
import { useCookies } from 'react-cookie';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const loginBtn = async () => {
    if(!email || !password){
      console.log('Incomplete details filled');
    }
    const data = {email, password};
    const response = await makeUnauthenticatedPOSTRequest('/auth/login', data);
    if(response && !response.err){
      console.log('logged in');
      const date = new Date();
      date.setDate(date.getDate() + 30);
      const token = response.token;
      setCookie('token', token, {path: '/', expires: date});
      navigate('/home');
    }
  }
  return (
    <div className='w-full h-screen bg-zinc-900 flex flex-col gap-10 justify-center items-center' style={{backgroundColor: '#74F0ED'}}>
        <div className='flex flex-col bg-white rounded-md w-4/12 h-3/4' style={{backgroundColor: '#000000'}}>
        <div className='w-full h-1/4 flex justify-center'><img src={logo} alt='logo'/></div>
        <div className='w-full h-3/4 flex flex-col justify-center items-center'>
        <Input value={email} setValue={setEmail} label="Email or Username" placeholder="Email" />
        <Password value={password} setValue={setPassword} label="Password" placeholder="Password" />
        <div className='p-4'><button onClick={(e) => {
          e.preventDefault();
          loginBtn();
        }} style={{backgroundColor:'#EA445A'}} className='rounded-md text-white p-4 font-bold text-base bg-white'>LOGIN</button></div>
        <div className='text-white text-base'>Don't have an Account? Register as <Link to='/signup' className='font-bold cursor-pointer'>Listener</Link>/<Link to='/artist/signup' className='font-bold cursor-pointer'>Artist</Link></div>
        </div>
        </div>      
        <div className=''>Made with ❤️ by Sanchit</div>    
    </div>
  )
}

export default Login