import React, { useContext, useEffect, useState } from 'react'
import levelsImage from '../../assets/levels.jpg';
import songContext from '../../contexts/songContext';
import likeImage from '../../assets/like-icon-2.jpg'
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../../utils/apiCalling';
import toast from 'react-hot-toast';

function NotificationCard({info, notificationData, setNotificationData}) {
    const [notificationStatus, setNotificationStatus] = useState("");

  const acceptRequest = async () => {
    const body = {friendId: info._id}
    const response = await makeAuthenticatedPOSTRequest('/me/accept/request', body);
    console.log(response);
    if(response && !response.err){
      toast.success("Request Accepted!");
        console.log('accepted');
    }
  }

  useEffect(()=>{
    const fetchFriendData = async () => {
        const response = await makeAuthenticatedGETRequest('/me/get/my/details/only');
        console.log(response);
        if(response.data.friends.some(user => user._id === info._id)){
            setNotificationStatus('accepted');
            console.log(notificationStatus);
        }
      }
      fetchFriendData();
  },[]);
  
  return (
    <div className='p-[1.2vw]'>
    <div className='bg-black hover:bg-gray-900 flex justify-center items-center mx-[2vw] rounded-md cursor-pointer h-[4vw]'>
      <div className='text-white font-bold h-3/4 rounded-full w-[3vw] text-[1.5vw] flex justify-center items-center mx-[1.5vw]' style={{backgroundColor: '#EA445A'}}>{info.firstName && info.firstName.charAt(0).toUpperCase()}</div>
    <div className='w-3/4 text-white flex flex-col justify-center px-[1vw]'>
        <div className='hover:underline text-[1.3vw] font-semibold'>
            {info.firstName+" "+info.lastName}
        </div>
    </div>
    <div onClick={(e)=>{
      e.preventDefault();
      if(notificationStatus!='accepted'){
      acceptRequest();
    }
    }} className='text-white font-semibold w-1/6 flex justify-center items-center h-7/10 rounded-md text-[1vw] cursor-pointer' style={{backgroundColor: '#EA445A'}}>
      {notificationStatus && notificationStatus=='accepted' ? 'Accepted' : 'Accept Request'}
    </div>

    </div>
</div>
  )
}

export default NotificationCard