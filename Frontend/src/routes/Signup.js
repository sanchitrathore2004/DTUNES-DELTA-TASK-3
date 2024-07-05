import React, { useState } from 'react'
import logo from '../assets/logo-2.png';
import Input from '../components/shared/Input';
import Password from '../components/shared/Password';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/apiCalling';
import {useCookies} from 'react-cookie';

function Signup() {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const signUpBtn = async () => {
    if(email != confirmEmail){
      return;
    }
    const data = {email, userName, password, firstName, lastName};
    const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);
    if(response && !response.err){
      console.log('done');
      const date = new Date();
      date.setDate(date.getDate()+30);
      const token = response.token;
      setCookie("token", token, {path: "/", expires: date});
      navigate("/home");
    }
  }
  return (
    <div className='w-full h-screen bg-zinc-900 flex flex-col justify-center items-center' style={{backgroundColor: '#74F0ED'}}>
    <div className='flex flex-col bg-white rounded-md w-4/12 h-9/10 my-2' style={{backgroundColor: '#000000'}}>
    <div className='w-full h-1/5 flex justify-center'><img src={logo} alt='logo'/></div>
    <div className='w-full h-3/ flex flex-col justify-center items-center'>
    <Input value={email} setValue={setEmail} label="Email or Username" placeholder="Email" />
    <Input value={confirmEmail} setValue={setConfirmEmail} label="Confirm Email" placeholder="Confirm Email" />
    <Input value={userName} setValue={setUserName} label="Username" placeholder="Username" />
    <Password value={password} setValue={setPassword} label="Password" placeholder="Create Password" />
    <div className='flex ml-3 gap-2'>
    <Input value={firstName} setValue={setFirstName} label="First Name" placeholder="First Name" />
    <Input value={lastName} setValue={setLastName} label="Last Name" placeholder="Last Name" />
    </div>
    <div className='p-4'><button style={{backgroundColor:'#EA445A'}} className='rounded-md text-white p-3 font-bold text-base bg-white' onClick={(e)=>{e.preventDefault();
      signUpBtn();
    }}>REGISTER AS LISTENER</button></div>
    <div className='text-white text-base'>Already have an Account? <Link to='/login' className='font-bold cursor-pointer'>Login</Link></div>
    </div>
    </div>    
    <div>Made with ❤️ by Sanchit</div>    
</div>
  )
}

export default Signup