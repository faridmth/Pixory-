import React from 'react'

const OptionCard = ({title,description}) => {
  return (
    <div>
        <div className='pl-[10px] py-[10px]'>
          <h2 className='text-md text-[#221e22] font-medium'>{title}</h2>
          <h5 className='text-[#8090a4] text-sm'>{description}</h5>
        </div>
        <div className=' border-[#d8d8d8] border-b w-full h-[1px]'></div>

    </div>
  )
}

export default OptionCard
