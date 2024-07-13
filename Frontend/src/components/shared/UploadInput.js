import React from 'react'

function UploadInput({label,placeholder, value, setValue}) {
  return (
    <div className='my-[0.5vw] flex justify-center itmes-center flex-col w-full'>
        <label for={label} className='text-black text-[1.5vw] font-bold p-[1.5vw]'>{label}</label>
        <input id={label} type='text' placeholder={placeholder} className='border-2 border-zinc-500 placeholder:text-[1vw] p-[1.8vw] h-[1.5vw] w-3/4 mx-[3vw] text-[1vw] flex justify-center items-center' value={value} onChange={(e) => { setValue(e.target.value)}}></input>
    </div>
  )
}

export default UploadInput