import React, { useContext, useEffect, useState } from 'react'
import levelsImage from '../../assets/levels.jpg';
import songContext from '../../contexts/songContext';
import likeImage from '../../assets/like-icon-2.jpg'
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../../utils/apiCalling';

function NotificationCard({info, notificationData, setNotificationData}) {
    const [notificationStatus, setNotificationStatus] = useState("");

  const acceptRequest = async () => {
    const body = {friendId: info._id}
    const response = await makeAuthenticatedPOSTRequest('/me/accept/request', body);
    console.log(response);
    if(response && !response.err){
        console.log('accepted');
    }
  }

  useEffect(()=>{
    const fetchFriendData = async () => {
        const response = await makeAuthenticatedGETRequest('/me/get/my/details/only');
        console.log(response);
        if(response.data.friends.includes(info._id)){
            setNotificationStatus('accepted');
            console.log(notificationStatus);
        }
      }
      fetchFriendData();
  },[]);
  
  return (
    <div className='p-4'>
    <div className='bg-black hover:bg-gray-900 flex justify-center items-center mx-12 rounded-md cursor-pointer h-14'>
      <div className='text-white font-bold h-3/4 rounded-full w-12 text-xl flex justify-center items-center mx-6' style={{backgroundColor: '#EA445A'}}>{info.firstName && info.firstName.charAt(0).toUpperCase()}</div>
    <div className='w-3/4 text-white flex flex-col justify-center px-5'>
        <div className='hover:underline font-semibold'>
            {info.firstName+" "+info.lastName}
        </div>
    </div>
    <div onClick={(e)=>{
      e.preventDefault();
      if(notificationStatus!='accepted'){
      acceptRequest();
    }
    }} className='text-white font-semibold w-1/6 flex justify-center items-center h-7/10 rounded-md cursor-pointer' style={{backgroundColor: '#EA445A'}}>
      {notificationStatus && notificationStatus=='accepted' ? 'Accepted' : 'Accept Request'}
    </div>

    </div>
</div>
  )
}

export default NotificationCard