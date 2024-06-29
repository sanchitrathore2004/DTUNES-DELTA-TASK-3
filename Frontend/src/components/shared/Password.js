import React from 'react'

function Password({label, placeholder, value, setValue}) {
  return (
    <div>
        <label for={label} className='text-white text-base'>{label}</label>
        <input type='password' placeholder={placeholder} className='placeholder:text-base p-3 rounded-md flex justify-center items-center' id={label} value={value} onChange={(e) => { setValue(e.target.value)}}></input>
    </div>
  )
}

export default Password