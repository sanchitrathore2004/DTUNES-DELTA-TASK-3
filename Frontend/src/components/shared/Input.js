import React from 'react'

function Input({label,placeholder, value, setValue}) {
  return (
    <div className='my-1'>
        <label for={label} className='text-white text-base'>{label}</label>
        <input id={label} type='text' placeholder={placeholder} className='placeholder:text-base p-3 rounded-md text-base flex justify-center items-center' value={value} onChange={(e) => { setValue(e.target.value)}}></input>
    </div>
  )
}

export default Input