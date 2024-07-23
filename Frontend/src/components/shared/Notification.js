import React, { useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling'
import UserCard from './UserCard';
import NotificationCard from './NotificationCard';

function Notification() {
    const [notificationData, setNotificationData] = useState([]);

    useEffect(()=>{
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest('/me/get/my/details');
            console.log(response);
            setNotificationData(response.data.inbox);
        }
        getData();
    },[]);

  return (
    <div>
        <LoggedInUI>
            <div className='flex flex-col'>
            <div className='px-[2vw] py-[0.8vw] text-white font-bold text-[2.2vw]'>
                What's New
            </div>
            <div>
                {notificationData.map((item)=>{
                    return <NotificationCard info={item} notificationData={notificationData} setNotificationData={setNotificationData} />
                })}
            </div>
            </div>
        </LoggedInUI>
    </div>
  )
}

export default Notification