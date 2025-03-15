import React from 'react'

const ToolBtn = ({tooltip,icon,onClick}) => {
  return (
    <div 
        className='btn btn-ghost !p-2 tooltip tooltip-bottom' 
        data-tip={tooltip}
        onClick={onClick}
    >
       {icon}
    </div>
  )
}

export default ToolBtn
