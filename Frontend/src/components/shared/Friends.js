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
            <div className='p-8 text-black text-3xl font-bold'>Friends</div>
            {friendsData.map((item)=>{
                return <FriendsCard info={item} />
            })}
        </LoggedInUI>
    </div>
  )
}

function FriendsCard ({info}) {
    return (
        <div className='p-4'>
    <div className='bg-black hover:bg-gray-900 w-3/4 flex justify-center items-center mx-12 rounded-md cursor-pointer h-14'>
      <div className='text-white font-bold h-3/4 rounded-full w-12 text-xl flex justify-center items-center mx-6' style={{backgroundColor: '#EA445A'}}>{info.firstName && info.firstName.charAt(0).toUpperCase()}</div>
    <div className='w-3/4 text-white flex flex-col justify-center px-5'>
        <div className='hover:underline font-semibold'>
            {info.firstName+" "+info.lastName}
        </div>
    </div>
    </div>
</div>
    )
}

export default Friends