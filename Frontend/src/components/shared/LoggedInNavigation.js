import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling';
import bellIcon from '../../assets/bell-icon-2.jpg';
import songContext from '../../contexts/songContext';

function LoggedInNavigation({firstText, nextText, onOpen}) {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState([]);
  const{userInfo, setUserInfo} = useContext(songContext);

  useEffect(()=>{
    const getData = async () => {
        const response  = await makeAuthenticatedGETRequest('/me/get/my/details');
        setProfileData(response.data); 
        setUserInfo(response.data);
    }
    getData();
});

  return (
    <div className='flex items-center'>
        <Link to='/partymode'><div className='font-bold text-[1.5vw] mx-[0.7vw] cursor-pointer hover:text-white'>PARTY MODE</div></Link>
        <div className='text-[1.5vw] font-bold mx-[0.7vw] cursor-pointer hover:text-white'><Link to={`${firstText=='SIGN UP'? `/signup` : `/upload/songs`}`} className='font-bold'>{firstText}</Link></div>
        <div className='bg-white w-[0.2vw] h-[2.2vw] m-[0.7vw] text-white'>'</div>
        <div className='font-bold h-full cursor-pointer hover:text-white'><img onClick={(e)=>{
          e.preventDefault();
          navigate('/notification');
        }} className='w-[2.2vw] h-[2.2vw] cursor-pointer rounded-full' src={bellIcon} /></div>
    <div onClick={onOpen} className={`${nextText!=''? `rounded-full w-[2.3vw] h-[2.3vw] flex items-center justify-center` : `rounded-md`} cursor-pointer font-bold mx-[0.7vw] text-[1.5vw] text-white`} style={{backgroundColor:'#1DB954'}}>{profileData.firstName && profileData.firstName.charAt(0).toUpperCase()}</div>
    </div>
  )
}

export default LoggedInNavigation