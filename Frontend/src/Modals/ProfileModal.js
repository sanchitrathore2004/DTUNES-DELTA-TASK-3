import React, { useContext, useEffect, useState } from 'react'
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../utils/apiCalling';
import { useCookies } from 'react-cookie';
import songContext from '../contexts/songContext';
import SpinnerLoader from '../components/shared/SpinnerLoader';


function ProfileModal({onClose}) {
  const {accountType, setAccountType} = useContext(songContext);
  const {currentSong, setCurrentSong} = useContext(songContext);
  const {partyModeData, setPartyModeData} = useContext(songContext);
  const{partyModeActivated, setPartyModeActivated} = useContext(songContext);
  const [cookie, setCookies] = useCookies(["token"]);
  const {paused, setPaused} = useContext(songContext);
  const [loaded, setLoaded] = useState(false);

    const [data,setData] = useState([]);

    useEffect(()=>{
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest('/me/get/my/details');
            console.log(response.data);
            await setData(response.data);
            setLoaded(true);
        }
        getData();
    },[]);

    const logoutFunc = async () => {
      const response = await makeAuthenticatedPOSTRequest('/auth/logout', {});
      setCookies('token', '');
      setAccountType(""); 
      setPaused(true);
      setCurrentSong(null);
      setPartyModeData(null);
      setPartyModeActivated(false);
      console.log(response);
    }

  return (
    <div onClick={onClose} className='w-full h-full bg-black bg-opacity-80 absolute text-white flex justify-center items-center'>
      {!loaded && <div className='w-full h-full'><SpinnerLoader /></div>}
        {loaded && <div className='gap-[2vmax] w-[30vmax] h-[35vmax] bg-zinc-900 text-white flex flex-col justify-center items-center rounded-[0.5vmax]'>
              <div style={{backgroundColor: '#1DB954'}} className='rounded-full text-[1.2vmax] w-[3vmax] h-[3vmax] flex justify-center items-center text-[1.7vmax] font-bold'>
                {data.firstName && data.firstName.charAt(0).toUpperCase()}
              </div>
              <div className='text-[1.2vmax] flex flex-col justify-center gap-[1vmax] items-center'>
              <div>
                <span className='font-bold'>Name : </span> {data.firstName+" "+data.lastName}
              </div>
              <div>
              <span className='font-bold'>Email : </span>{data.email}
              </div>
              <div>
              <span className='font-bold'>Username : </span>{data.userName}
              </div>
              <div>
              <span className='font-bold'>Account Type : </span>{data.accountType && data.accountType.toUpperCase()}
              </div>
              </div>
              <div onClick={(e)=>{
                e.preventDefault();
                logoutFunc();
              }} style={{backgroundColor: '#1DB954'}} className='p-[1vmax] cursor-pointer rounded-[0.5vmax] text-white text-[1.1vmax] font-bold'>
                Logout
              </div>
        </div>}
    </div>
  )
}

export default ProfileModal