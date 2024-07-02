import React, { useEffect, useState } from 'react'
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../utils/apiCalling';
import { useCookies } from 'react-cookie';

function ProfileModal({onClose}) {
  const [cookie, setCookies] = useCookies(["token"]);

    const [data,setData] = useState([]);

    useEffect(()=>{
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest('/me/get/my/details');
            console.log(response.data);
            setData(response.data);
        }
        getData();
    },[]);

    const logoutFunc = async () => {
      const response = await makeAuthenticatedPOSTRequest('/auth/logout', {});
      setCookies('token', '');
      console.log(response);
    }

  return (
    <div onClick={onClose} className='w-full h-full bg-black bg-opacity-80 absolute text-white flex justify-center items-center'>
        <div className='gap-10 w-1/3 h-1/2 bg-zinc-900 text-white flex flex-col justify-center items-center rounded-md'>
              <div style={{backgroundColor: '#EA445A'}} className='rounded-full w-12 h-12 flex justify-center items-center text-2xl font-bold'>
                {data.firstName && data.firstName.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className='font-bold'>Name : </span> {data.firstName+" "+data.lastName}
              </div>
              <div>
              <span className='font-bold'>Email : </span>{data.email}
              </div>
              <div>
              <span className='font-bold'>Username : </span>{data.userName}
              </div>
              <div onClick={(e)=>{
                e.preventDefault();
                logoutFunc();
              }} style={{backgroundColor: '#EA445A'}} className='p-2 cursor-pointer rounded-md text-white text-2xl font-bold'>
                Logout
              </div>
        </div>
    </div>
  )
}

export default ProfileModal