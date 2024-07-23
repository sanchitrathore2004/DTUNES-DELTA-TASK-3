import React, { useContext, useState } from 'react'
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


  const clientId = 'Yc8VTFJ0m8Hetmzz';
  const redirectUri = encodeURIComponent('http://localhost:3000/callback');
  const responseType = 'code';
  const grantType = 'authorization_code';
  const state = 'YOUR_RANDOM_STATE_STRING';
  const scope = 'email openid profile user';
  const nonce = 'YOUR_RANDOM_NONCE_STRING';

  const loginWithDauth = () => {
    const authorizationUrl = `https://auth.delta.nitt.edu/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&grant_type=${grantType}&state=${state}&scope=${scope}&nonce=${nonce}`;
    window.location.href = authorizationUrl;
  };

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
    <div style={{backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/707/220/899/gradient-blue-pink-abstract-art-wallpaper-preview.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='w-full h-screen bg-white flex flex-col gap-[1.5vmax] justify-center items-center'>
        <div className='flex flex-col rounded-md w-[32vmax] h-[38vmax] border-2'>
        <div className='w-full h-1/4 my-[1vmax] flex justify-center'><img className='w-[8vmax] h-[8vmax]' src={logo} alt='logo'/></div>
        <div className='w-full h-3/4 flex flex-col justify-center items-center'>
        <Input value={email} setValue={setEmail} label="Email Address" placeholder="Email" />
        <Password value={password} setValue={setPassword} label="Password" placeholder="Password" />
        <div className=' flex justify-center items-center'><button onClick={(e) => {
          e.preventDefault();
          loginBtn();
        }} style={{backgroundColor:'#EA445A'}} className='rounded-[0.5vmax] text-white p-[1vmax] font-bold text-[1.2vmax] bg-white'>LOGIN</button></div>
        <div className='text-white my-[0.5vmax] text-[1.1vmax]'>Don't have an Account? Register as <Link to='/signup' className='font-bold cursor-pointer'>Listener</Link>/<Link to='/artist/signup' className='font-bold cursor-pointer'>Artist</Link></div>
        <div className='text-white font-bold text-[1.5vmax] my-[0.5vmax]'>OR</div>
        <div onClick={(e)=>{
          e.preventDefault();
          loginWithDauth();
        }} className='text-white my-[0.3vmax] bg-zinc-800 p-[1vmax] rounded-[0.5vmax] cursor-pointer font-bold text-[1.1vmax]'>Login with DAUTH</div>
        </div>
        </div>      
        {/* <footer className='text-[1.3vmax] text-white font-bold'>DTUNES</footer>     */}
    </div>
  )
}

export default Login