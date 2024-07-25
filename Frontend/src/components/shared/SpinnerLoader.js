import React, { useState } from 'react'
import spinner from '../../assets/spinner2.svg';

function SpinnerLoader() {
    const [showSpinner, setShowSpinner] = useState(false);
  return (
    <div className='w-full h-full flex justify-center items-center'>{<img src={spinner} />}</div>
  )
}

export default SpinnerLoader