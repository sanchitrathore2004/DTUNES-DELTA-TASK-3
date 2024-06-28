import React from 'react'

function IconText({icon, text}) {
  return (
    <div className='flex '>
        <div className='w-1/3 flex justify-end items-center'><img src={icon} alt='icon' className='rounded-full w-2/5 `h-3/5'/></div>
        <div style={{fontSize: '10px'}} className='hover:text-white p-2 font-bold text-gray-400 flex justify-center items-center cursor-pointer'>{text}</div>
    </div>
  )
}

export default IconText