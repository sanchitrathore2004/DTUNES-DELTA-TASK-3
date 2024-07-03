import React from 'react'

function DroupDown({value , setValue}) {
  return (
    <div className='flex justify-center itmes-center flex-col w-1/2 h-full'>
        <form>
            <div className='h-1/2 w-full flex items-center p-5'><label className='text-black text-xl font-bold' htmlFor='visibility'>Playlist Visibility</label></div>
            <div className='h-1/2 flex justify-center items-center w-full '><select value={value} onChange={(e)=>{
                setValue(e.target.value);
            }} className='placeholder:text-base p-3 my-1 rounded-md w-3/4 mx-10 text-base flex justify-center items-center' id='visibility'>
                <option value=''>Select</option>
                <option value='Public'>Public</option>
                <option value='Private'>Private</option>
            </select>
            </div>
        </form>
    </div>
  )
}

export default DroupDown