import React from 'react'

function Password({label, placeholder, value, setValue}) {
  return (
    <div className='my-[0.5vmax] w-full flex flex-col'>
        <label for={label} className='text-white font-semibold mx-[4vmax] text-[1.5vmax]'>{label}</label>
        <div className='flex justify-center items-center w-full'>
        <input required={true} type='password' placeholder={placeholder} className='p-[0.5vw] placeholder:text-[1vmax] rounded-[0.5vmax] text-[1vmax] h-[2.9vmax] w-3/4 flex justify-center items-center' id={label} value={value} onChange={(e) => { setValue(e.target.value)}}></input></div>
    </div>
  )
}

export default Password