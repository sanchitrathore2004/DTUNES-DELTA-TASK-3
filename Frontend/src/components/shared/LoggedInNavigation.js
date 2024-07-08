import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';
import bellIcon from '../../assets/bell-icon-2.jpg';

function LoggedInNavigation({firstText, nextText, onOpen}) {
  const navigate = useNavigate();

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
        <div className='font-bold h-full text-2xl cursor-pointer hover:text-white'><img onClick={(e)=>{
          e.preventDefault();
          navigate('/notification');
        }} className='w-12 h-12 cursor-pointer rounded-full' src={bellIcon} /></div>
        <div className='bg-white w-0.5 m-4 text-white'>'</div>
        <Link to='/partymode'><div className='font-bold text-2xl mx-4 cursor-pointer hover:text-white'>PARTY MODE</div></Link>
        <div className='text-2xl font-bold cursor-pointer hover:text-white'><Link to={`${firstText=='SIGN UP'? `/signup` : `/upload/songs`}`} className='font-bold'>{firstText}</Link></div>
    <div onClick={onOpen} className={`${nextText!=''? `rounded-full w-12 flex items-center justify-center` : `rounded-md`} cursor-pointer font-bold p-2 mx-3 text-2xl text-white`} style={{backgroundColor:'#EA445A'}}>{profileData.firstName && profileData.firstName.charAt(0).toUpperCase()}</div>
    </div>
  )
}

export default LoggedInNavigation