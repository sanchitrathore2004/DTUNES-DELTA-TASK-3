import React, { useContext, useEffect, useState } from 'react'
import levelsImage from '../../assets/levels.jpg';
import songContext from '../../contexts/songContext';
import likeImage from '../../assets/like-icon-2.jpg'
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../../utils/apiCalling';

function UserCard({info}) {
  const [userData, setUserData] = useState([]);

  const sendRequest = async () => {
    console.log(info._id);
    const body = {requestId: info._id};
    const response = await makeAuthenticatedPOSTRequest('/me/send/request', body);
    console.log(response);
  }

  useEffect(()=>{
    const getData = async () => {
      const data = await makeAuthenticatedGETRequest('/me/get/my/details/only');
      console.log(data);
      setUserData(data.data.friends);
    }
    getData();
  },[]);

  useEffect(()=>{
    console.log(userData);
  },[userData]);
  
  return (
    <div className='p-4'>
    <div className='bg-black hover:bg-gray-900 flex justify-center items-center mx-12 rounded-md cursor-pointer h-14'>
      <div className='text-white font-bold h-3/4 rounded-full w-12 text-xl flex justify-center items-center mx-6' style={{backgroundColor: '#EA445A'}}>{info.firstName && info.firstName.charAt(0).toUpperCase()}</div>
    <div className='w-3/4 text-white flex flex-col justify-center px-5'>
        <div className='hover:underline font-semibold'>
            {info.firstName+" "+info.lastName}
        </div>
    </div>
    {userData && userData.includes(info._id) && <div className='text-white font-semibold w-1/6 flex justify-center items-center h-7/10 rounded-md cursor-pointer' style={{backgroundColor: '#EA445A'}}>
      Friend
    </div>}
    {!userData.includes(info._id) && <div onClick={(e)=>{
      e.preventDefault();
      sendRequest();
    }} className='text-white font-semibold w-1/6 flex justify-center items-center h-7/10 rounded-md cursor-pointer' style={{backgroundColor: '#EA445A'}}>
      Send Request
    </div>}

    </div>
</div>
  )
}

export default UserCard