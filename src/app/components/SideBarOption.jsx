import React from 'react'

const SideBarOption = ({icon,title,onclick}) => {
  return (
    <div 
        className='btn btn-ghost  rounded-none flex flex-col
           justify-center items-center py-9' 
        data-tip={title}
        onClick={onclick}
    >
        <div>
            {icon}
        </div>
        <p className='text-[12px]'>{title}</p>
    </div>

  )
}

export default SideBarOption
