import React, { useContext, useEffect, useState } from 'react'
import LoggedInUI from './LoggedInUI'
import { makeAuthenticatedGETRequest } from '../../utils/apiCalling'
import SongCard from './SongCard';
import songContext from '../../contexts/songContext';
import { Howl, Howler } from 'howler';
import { Link } from 'react-router-dom';

function PartyMode() {
    const {playlist} = useContext(songContext);
    const {currentSong, setCurrentSong} = useContext(songContext);
    const [playlistName, setPLaylistName] = useState("");
    console.log(playlist);
    const [musicPlayed, setMusicPlayed] = useState(null);
    const{partyModeActivated, setPartyModeActivated} = useContext(songContext);
    const {partyModeData, setPartyModeData} = useContext(songContext); 
    const {partyModeFriendName, setPartyModeFriendName} = useContext(songContext);

    const playNextSong = async () => {
        const currentIndex = partyModeData.indexOf(currentSong);
        setCurrentSong(partyModeData[currentIndex+1]);
        console.log('new song',currentSong);
      }

    useEffect(()=>{
        if(!partyModeActivated){
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest('/me/get/my/details');
            console.log(response);
            const friendsArrayLength = await response.data.friends.length;
            if(friendsArrayLength==0){
                return;
            }
            const friendId = await response.data.friends[Math.floor(Math.random()*friendsArrayLength)]._id;
            console.log(friendId);
            const friendName = await makeAuthenticatedGETRequest('/me/get/user/by/'+friendId);
            console.log(friendName);
            setPartyModeFriendName(friendName.data.firstName);
            const response2 = await makeAuthenticatedGETRequest('/playlist/get/playlist/by/'+friendId);
            console.log(response2);
            const playlistArrayLength = await response2.data.length;
            const playlistSongs = await response2.data[Math.floor(Math.random()*playlistArrayLength)].songs;
            console.log(playlistSongs);
            const myPlalist = await makeAuthenticatedGETRequest('/playlist/get/my/playlist');
            const myPlalistLength = await myPlalist.data.length;
            const mySongs = await myPlalist.data[Math.floor(Math.random()*myPlalistLength)].songs;
            console.log(mySongs);
            const combinedSongs = [...playlistSongs, ...mySongs]
            const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };
            setPartyModeData(shuffleArray(combinedSongs));
        }
        getData();
        setPartyModeActivated(true);
    }
    },[]);
    useEffect(()=>{
        console.log(partyModeData);
    },[partyModeData]);

    const playMusic = (songSrc) => {
        if(musicPlayed){
            musicPlayed.stop();
        } 
        let sound = new Howl({
            src: [songSrc],
            html5: true,
            onend: () => {
              console.log('song ended');
              playNextSong();
            },
          });
  
          setMusicPlayed(sound);
          
          sound.play();
    }

  return (
    <div>
        <LoggedInUI>
            <div className='px-[2vw] py-[0.8vw] text-[2.2vw] font-bold'>Party Mode (You & {partyModeFriendName})</div>
            {partyModeData.length>0 && partyModeData.map((item)=>{
                return <SongCard playMusic={playMusic} info={item} />
            })}

            {partyModeData.length==0 && <Link to='/searchpage'><button style={{backgroundColor: '#EA445A'}} className='mx-[2.5vmax] rounded-[0.5vmax] text-white font-semibold text-[1.5vmax] p-[0.5vmax]'>Add Friends</button></Link>}
            
        </LoggedInUI>
    </div>
  )
}

export default PartyMode