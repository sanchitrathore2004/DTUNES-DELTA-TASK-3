import React from 'react'

function IconText({icon, text, brigth}) {
  return (
    <div className='flex gap-0'>
        {/* <div className='w-1/3 flex items-center'><img src={icon} alt='icon' className='rounded-full w-[2.5vw] h-[2.5vw]'/></div> */}
        <div className={`text-[1.5vw] hover:text-white p-[0.5vw] ${brigth==text ? 'text-white' : 'text-gray-600'} font-bold flex justify-center items-center cursor-pointer`}>{text}</div>
    </div>
  )
}

export default IconText