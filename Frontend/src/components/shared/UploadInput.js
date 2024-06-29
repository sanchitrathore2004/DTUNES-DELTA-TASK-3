import React from 'react'

function UploadInput({label,placeholder, value, setValue}) {
  return (
    <div className='my-1 w-1/2'>
        <label for={label} className='text-black text-xl font-bold p-10'>{label}</label>
        <input id={label} type='text' placeholder={placeholder} className='placeholder:text-base p-3 rounded-md w-3/4 mx-10 text-base flex justify-center items-center' value={value} onChange={(e) => { setValue(e.target.value)}}></input>
    </div>
  )
}

export default UploadInput