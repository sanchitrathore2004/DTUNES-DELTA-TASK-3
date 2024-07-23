import React, { useContext, useEffect, useState } from 'react'
import levelsImage from '../../assets/levels.jpg';
import songContext from '../../contexts/songContext';
import likeImage from '../../assets/like-icon-2.jpg'
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../../utils/apiCalling';
import toast from 'react-hot-toast';

function UserCard({info}) {
  const [userData, setUserData] = useState([]);

  const sendRequest = async () => {
    console.log(info._id);
    const body = {requestId: info._id};
    const response = await makeAuthenticatedPOSTRequest('/me/send/request', body);
    if(response && !response.err){
      toast.success("Request Sent!");
      console.log(response);
    }
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
    console.log(info._id);
  },[userData]);

  const isFriend = userData.some(user => user._id === info._id);
  console.log(isFriend);
  
  return (
    <div className='p-[2vmax]'>
    <div className='bg-black hover:bg-gray-900 flex justify-center items-center mx-[3vmax] rounded-md cursor-pointer h-[4vmax]'>
      <div className='text-white font-bold h-3/4 rounded-full w-[3vmax] text-[1.5vmax] flex justify-center items-center mx-[2vmax]' style={{backgroundColor: '#1DB954'}}>{info.firstName && info.firstName.charAt(0).toUpperCase()}</div>
    <div className='w-3/4 text-white flex flex-col justify-center px-[2vmax]'>
        <div className='hover:underline font-semibold text-[1.5vmax]'>
            {info.firstName+" "+info.lastName}
        </div>
    </div>
    {isFriend ? (
          <div className='text-white text-[1.1vmax] font-semibold w-1/6 flex justify-center items-center h-7/10 rounded-md cursor-pointer' style={{ backgroundColor: '#1DB954' }}>
            Friend
          </div>
        ) : (
          <div onClick={(e) => {
            e.preventDefault();
            sendRequest();
          }} className='text-white text-[1.1vmax] font-semibold w-1/6 flex justify-center items-center h-7/10 rounded-md cursor-pointer' style={{ backgroundColor: '#1DB954' }}>
            Send Request
          </div>
        )}

    </div>
</div>
  )
}

export default UserCard