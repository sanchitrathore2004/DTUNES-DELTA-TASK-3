import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { makeUnauthenticatedGETRequest, makeUnauthenticatedPOSTRequest } from '../../utils/apiCalling';

const Callback = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(['token']);
  const [value, setValue] = useState("");
    
      const func = async () => {
        const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    console.log("Authorization code:", code); // Debugging line

    if (code) {
      const clientId = 'Yc8VTFJ0m8Hetmzz';
      const clientSecret = 'qcB_PvB-BXLUTcCbO.67Mmiujmlqtp1y';
      const redirectUri = 'http://localhost:3000/callback';

      console.log('Preparing to exchange code for tokens...'); // Debugging line

      const body = {
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      };

      console.log(body);
        const response = await makeUnauthenticatedPOSTRequest('/auth/proxy/token', body);
        console.log(response);
        if(response){
            const access_token = response.access_token;
            const id_token = response.id_token;
        const user = await makeUnauthenticatedGETRequest('/auth/get/user/details');
        console.log(user);

        const body = {
          email: user.email,
          name: user.name,
          accountType: value,
        };
    
        const response2 = await makeUnauthenticatedPOSTRequest('/auth/create/user/dauth', body);
    
        console.log(response2);
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie('token', response2.token, {path: '/', expires: date});
    
        navigate('/loggedin/home');
        }
      }
    }

  return <div style={{backgroundColor: '#74F0ED'}} className='h-screen w-full flex flex-col justify-center items-center'>
    <div className='w-full flex justify-center items-center'>
    {<select className='w-[15vmax] text-[1.1vmax] text-center h-[2.5vmax]' value={value} onChange={(e)=>{
      setValue(e.target.value);
    }}>
      <option>select account type</option>
      <option>artist</option>
      <option>listener</option>
      </select>
      }
      </div>
      <div>
      {<button style={{backgroundColor: '#EA445A'}} className='cursor-pointer text-white m-[2vmax] p-[1vmax] rounded-[0.7vmax] text-[1.1vmax] font-bold' onClick={(e)=>{
        e.preventDefault();
        func();
      }}>Proceed</button>}</div>
  </div>;
};

export default Callback;
