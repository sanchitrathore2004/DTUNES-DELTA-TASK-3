import React from 'react'

function DroupDown({value , setValue}) {
  return (
    <div className='flex justify-center itmes-center flex-col w-1/2 h-full'>
        <form>
            <div className='h-1/2 w-full flex text-white items-center p-[1.4vmax]'><label className='text-white text-[1.5vmax] font-bold' htmlFor='visibility'>Playlist Visibility</label></div>
            <div className='h-1/2 flex justify-center items-center w-full '><select value={value} onChange={(e)=>{
                setValue(e.target.value);
            }} className='placeholder:text-base p-[1vmax] my-[0.7vmax] rounded-[0.1vmax] w-3/4 mx-[2vmax] text-[1.1vmax] flex justify-center items-center' id='visibility'>
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