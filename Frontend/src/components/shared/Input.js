import React from 'react'

function Input({label,placeholder, value, setValue}) {
  return (
    <div className='my-[0.5vmax] w-full flex flex-col justify-center items-center'>
        <label for={label} className='text-white text-[1.2vmax]'>{label}</label>
        <input id={label} type='text' placeholder={placeholder} className='placeholder:text-[1vmax] rounded-[0.5vmax] text-[1vmax] h-[2.9vmax] w-3/4 flex justify-center p-[0.5vw] items-center' value={value} onChange={(e) => { setValue(e.target.value)}}></input>
    </div>
  )
}

export default Input