import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';

function LoggedInNavigation({firstText, nextText, onOpen}) {

  const [profileData, setProfileData] = useState([]);

  useEffect(()=>{
    const getData = async () => {
        const response  = await makeAuthenticatedGETRequest('/me/get/my/details');
        setProfileData(response.data);
    }
    getData();
});

  return (
    <div className='flex items-center'>
        <div className='font-bold text-2xl cursor-pointer hover:text-white'>ABOUT US</div>
        <div className='bg-white w-0.5 m-4 text-white'>'</div>
        <div className='text-2xl font-bold cursor-pointer hover:text-white'><Link to={`${firstText=='SIGN UP'? `/signup` : `/upload/songs`}`} className='font-bold'>{firstText}</Link></div>
    <div onClick={onOpen} className={`${nextText!=''? `rounded-full w-12 flex items-center justify-center` : `rounded-md`} cursor-pointer font-bold p-2 mx-3 text-2xl text-white`} style={{backgroundColor:'#EA445A'}}>{profileData.firstName && profileData.firstName.charAt(0).toUpperCase()}</div>
    </div>
  )
}

export default LoggedInNavigation