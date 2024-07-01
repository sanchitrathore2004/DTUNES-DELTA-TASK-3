import React, { useEffect } from 'react'
import LoggedInUI from './LoggedInUI'
import {makeAuthenticatedGETRequest} from '../../utils/apiCalling';

function MyPlaylist() {

    useEffect(()=>{
        const getPlaylist = async () => {
            const response = await makeAuthenticatedGETRequest('/playlist/get/my/playlist');
            console.log(response);
        }
        getPlaylist();
    },[]);
  return (
    <div>
        <LoggedInUI>

        </LoggedInUI>
    </div>
  )
}

export default MyPlaylist