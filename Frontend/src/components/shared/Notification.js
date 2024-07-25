import React, { useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling'
import UserCard from './UserCard';
import NotificationCard from './NotificationCard';
import SpinnerLoader from './SpinnerLoader';

function Notification() {
    const [notificationData, setNotificationData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest('/me/get/my/details');
            console.log(response);
            await setNotificationData(response.data.inbox);
            setLoaded(true);
        }
        getData();
    },[]);

  return (
    <div>
        <LoggedInUI>
        {!loaded && <div className='w-full h-full'><SpinnerLoader /></div>}
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