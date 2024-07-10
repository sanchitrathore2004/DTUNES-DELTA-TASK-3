import React, { useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';
import UserCard from './UserCard';

function Friends() {
    const [friendsData, setFriendsData] = useState([]);

    useEffect(()=>{
        const getData = async () => {
            const data = await makeAuthenticatedGETRequest('/me/get/my/details');
            console.log(data.data.friends);
            setFriendsData(data.data.friends);
        }
        getData();
    },[]);
  return (
    <div>
        <LoggedInUI>
            <div className='px-[2vw] py-[0.8vw] text-black text-[2.2vw] font-bold'>Friends</div>
            {friendsData.map((item)=>{
                return <FriendsCard info={item} />
            })}
        </LoggedInUI>
    </div>
  )
}

function FriendsCard ({info}) {
    return (
        <div className='p-[1.5vmax]'>
    <div className='bg-black hover:bg-gray-900 w-3/4 flex justify-center items-center mx-[3vmax] rounded-[0.5vmax] cursor-pointer h-[4vmax]'>
      <div className='text-white font-bold h-3/4 rounded-full w-[3vmax] text-[1.7vmax] flex justify-center items-center mx-[1.5vmax]' style={{backgroundColor: '#EA445A'}}>{info.firstName && info.firstName.charAt(0).toUpperCase()}</div>
    <div className='w-3/4 text-white flex flex-col justify-center px-[2vmax]'>
        <div className='hover:underline font-semibold text-[1.3vmax]'>
            {info.firstName+" "+info.lastName}
        </div>
    </div>
    </div>
</div>
    )
}

export default Friends