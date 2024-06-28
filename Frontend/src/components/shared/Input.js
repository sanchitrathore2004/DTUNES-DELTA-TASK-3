import React from 'react'

function Input({label,placeholder}) {
  return (
    <div>
        <label for={label} className='text-white text-xs'>{label}</label>
        <input type='text' placeholder={placeholder} className='w-11/12 h-3 placeholder:text-xs p-3 rounded-md text-xs flex justify-center items-center'></input>
    </div>
  )
}

export default Input