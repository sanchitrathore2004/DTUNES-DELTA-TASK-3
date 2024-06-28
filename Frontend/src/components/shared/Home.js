import React from 'react'
import logo from '../../assets/logo-2.png';
import IconText from './IconText';
import homeIcon from '../../assets/home-icon.jpg';
import searchIcon from '../../assets/search-icon.png';
import playlistIcon from '../../assets/playlist-icon-3.png';
import addIcon from '../../assets/add-icon-3.jpg';
import likeIcon from '../../assets/like-icon-2.jpg';
import Navigation from './Navigation';
import siddhuImage from '../../assets/siddhu.jpg';
import guruImage from '../../assets/guru.jpg';
import hardyImage from '../../assets/hardy.jpg';
import diljitImage from '../../assets/diljit.jpeg';
import APImage from '../../assets/AP_Dhillon_CA.jpg';
let i=0;

function Home() {
  return (
    <div className='flex w-full h-screen'>
        <div className='bg-black h-screen flex flex-col items-center w-1/5'>
            <div className='flex justify-center items-center p-2 my-3'><img src={logo} alt='logo' className='w-2/4'/></div>
            <div><IconText icon={homeIcon} text="HOME" /></div>
            <div><IconText icon={searchIcon} text="SEARCH" /></div>
            <div><IconText icon={playlistIcon} text="PLAYLISTS" /></div>
            <div><IconText icon={addIcon} text="CREATE PLAYLISTS" /></div>
            <div><IconText icon={likeIcon} text="LIKED SONGS" /></div>
        </div>
        <div className='w-4/5'>
            <div className='h-1/10 bg-black text-gray-400 flex items-center justify-end'>
                <Navigation />
            </div>
            <div className='h-9/10 overflow-auto' style={{backgroundColor:'#74F0ED'}}>
                <PlayList titleName='Punjabi Playlist' />
                <PlayList titleName='Bollywood' />
                
            </div>
        </div>
    </div>
  )
}

function PlayList ({titleName}) {
    return (
        <div className='p-3 font-semibold'>{titleName}
        <div className='flex my-2'>
                <Cards thumbnail={siddhuImage} title='Siddhu Moosewala' description='Hit Punjabi Songs' />
                <Cards thumbnail={guruImage} title='Guru Randhawa' description='Hit Punjabi Songs' />
                <Cards thumbnail={hardyImage} title='Hardy Sandhu' description='Hit Punjabi Songs' />
                <Cards thumbnail={diljitImage} title='Diljit Dosanjh' description='Hit Punjabi Songs' />
                <Cards thumbnail={APImage} title='AP Dhillon' description='Hit Punjabi Songs' />
                </div></div>
    )
}

function Cards ({thumbnail, title, description}) {
    return (
        <div className='cursor-pointer hover:bg-zinc-900 p-2 flex flex-col items-center justify-end text-white bg-black w-1/5 mx-2 rounded-md'>
            <div className='my-2'><img className='w-full h-auto h-full rounded-md' src={thumbnail} /></div>
            <div className='font-semibold text-medium'>{title}</div>
            <div className='text-small text-gray'>{description}</div>
        </div>
    )
}

export default Home